import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	HostListener,
	Input,
	OnChanges,
	OnInit,
	Output,
	QueryList,
	ViewChild,
	ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Category, Contact, EntityMetadata, ERM, Event, Product, Project, Supplier, SupplierType, Tag } from '~core/models';
import { DynamicField } from '~shared/dynamic-forms';
import { FilterList } from '~shared/filters/models/filter-list.class';
import { AbstractInput, InputDirective } from '~shared/inputs';
import { SelectorsService } from '~shared/selectors/services/selectors.service';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlightable.component';
import { ID, RegexpApp } from '~utils';

@Component({
	selector: 'selector-picker-app',
	templateUrl: './selector-picker.component.html',
	styleUrls: ['./selector-picker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorPickerComponent extends AbstractInput implements OnInit, AfterViewInit, OnChanges {

	private _type: EntityMetadata;
	@Input() set type(type: EntityMetadata) {
		this._type = type;
	}
	get type(): EntityMetadata {
		return this._type;
	}
	@Input() multiple = false;
	@Input() canCreate = false;
	@Input() dynamicFields: DynamicField[];
	@Input() filterList = new FilterList([]);
	/**
	 * this is used when we have a selector that uses Selector Elements, so we can know which selectors elements
	 * we need to query
	 */
	@Input() definitionReference: ID;
	// sometimes we want to start with something to search already
	@Input() searchTxt = '';

	@Output() update = new EventEmitter<any>();
	@Output() close = new EventEmitter<null>();

	// this closes the selector without closing dialogs, etc
	@HostListener('keydown.escape', ['$event'])
	onKeydownEsc(event) {
		event.stopPropagation();
		this.close.emit();
	}

	/** choices to iterate */
	choices$: Observable<any[]>;
	/** local choices to iterate, these choices are not in our DB */
	choicesLocal = [];

	/**
	 * items inside the virtual scroll that are needed for the cdk a11y selection with arrow keys
	 * each row on the virtual scroll has to implement the AbstractSelectorHighlightableComponent,
	 * since they keyManager needs it to update state of selection
	*/
	// for some reason it doesnt work without the id string
	@ViewChildren('abstract') virtualItems: QueryList<AbstractSelectorHighlightableComponent>;
	/** Exact same list but with elementRef type so it can be scrolles */
	@ViewChildren('abstract', { read: ElementRef }) elementRefItems: QueryList<ElementRef>;
	/** cdk virtual scroll viewport so we can determine the scroll index in combination with cdk a11y */
	@ViewChild(CdkVirtualScrollViewport, { static: false }) cdkVirtualScrollViewport: CdkVirtualScrollViewport;

	@ViewChild(InputDirective, { static: true }) inp: InputDirective;
	group: FormGroup;


	/** key manager that controlls the selection with arrowkeys  */
	keyManager: ActiveDescendantKeyManager<AbstractSelectorHighlightableComponent>;
	/** index when using manager keys and virtual scrolling */
	count = 0;

	searched$: Subject<string> = new Subject();

	/** whether the search has a exact match or not to display the create button */
	nameExists$: Observable<boolean>;

	// this helps the condition of fast typing only apply when typing and pressing Enter (OnKeyDown function)
	movedArrow = false;

	erm = ERM;

	constructor(
		public selectorSrv: SelectorsService,
		protected cd: ChangeDetectorRef,
		private fb: FormBuilder
	) { super(cd); }

	ngOnInit() {
		this.group = this.fb.group({
			name: ['']
		});

		if (this.canCreate) {
			this.nameExists$ = this.searched$.pipe(
				switchMap(_ => this.choices$.pipe(
					map(items => this.checkExist(items)),
					// if text is found on choices$ OR
					// if the text is empty OR
					// if the text is inside the value array (only multiple allowed)
					map(items => (!!items.length || !this.searchTxt || this.hasName(this.searchTxt)))
				))
			);
		}

		// init the list query
		if (this.multiple) {
			if (!this.value)
				this.value = [];
			// if its multiple we want to filter the values that we have currently selected, so they don't appear on the options
			this.choices$ = this.getChoices(this.type).pipe(map((items) => this.filterValues(items)));
		} else {
			this.choices$ = this.getChoices(this.type);
		}

		// if there is any search text available when we start the component, we search for it
		if (this.searchTxt)
			this.search(this.searchTxt);
	}

	ngAfterViewInit() {
		this.keyManager = new ActiveDescendantKeyManager(this.virtualItems).withWrap().withTypeAhead();
		this.inp.focus();
		this.search(this.searchTxt);
	}

	ngOnChanges() {
		this.selectorSrv.setFilters(this.filterList);
		if (this.choices$ && this.multiple) {
			// if its multiple we want to filter the values that we have currently selected, so they don't appear on the options
			this.choices$.pipe(map((items) => this.filterValues(items)));
		}
		// we use this refetch, cause sometimes selector wasn't loading the latest data added
		// the observable was already initialized and didn't trigger the latest changes until you used the search
		this.selectorSrv.refetch();
	}

	/**
	 * when the selector has multiple choice, we call this function to filter choices
	 * so the elements inside the value (array), does not appear on the choices
	 * @param items
	 */
	private filterValues(items: any[]) {
		switch (this.type) {
			case ERM.EMAIL:
				return items.filter(i => (this.value) ? !((this.value || []).some(val => val === i.email)) : true);
			default:
				// only items that are not on the value array so they don't appear in the options
				return items.filter(i =>
					// if the array exists we check that the item does not exist on the value array
					(this.value) ? !((this.value).some(val => val.id === i.id)) : true);
		}
	}

	/**
	 * resets input, focus input and reset search
	 */
	private resetInput() {
		this.inp.control.reset();
		this.inp.focus();
		this.search('', false);
	}

	/**
	 * search a text and set first item active on selector
	 * @param text
	 */
	search(text, setFirstItemActive = true) {
		this.searchTxt = text.trim();
		this.movedArrow = false;
		this.selectorSrv.search(this.type, this.searchTxt)
			.subscribe(_ => {
				if (setFirstItemActive)
					this.keyManager.setFirstItemActive();
				else // we use this to hide the first active item, since the focus is on the input now
					this.keyManager.updateActiveItem(-1);
				this.cd.markForCheck(); // otherwise sometimes it won't set the first item active until cd is triggered
			});
		this.searched$.next(this.searchTxt);
	}

	/** choices of the given type, remember to add a new selector row component if you add a new type or use an existign one */
	// ARRAYS START AT 1 NOT 0!!!! now that I have your attention ADVICE: when adding a new choice, check the update single method
	private getChoices(type: EntityMetadata): Observable<any[]> {
		switch (type) {
			case ERM.CATEGORY: return this.selectorSrv.getCategories();
			case ERM.EMAIL:
			case ERM.CONTACT: return this.selectorSrv.getContacts();
			case ERM.COUNTRY: return this.selectorSrv.getCountriesGlobal();
			case ERM.CURRENCY: return this.selectorSrv.getCurrenciesGlobal();
			case ERM.EVENT: return this.selectorSrv.getEvents();
			case ERM.HARBOUR: return this.selectorSrv.getHarboursGlobal();
			case ERM.INCO_TERM: return this.selectorSrv.getIncoTermsGlobal();
			case ERM.LENGTH_UNIT: return this.selectorSrv.getLengthUnits();
			case ERM.PICKER_FIELD: return this.selectorSrv.getDynamicFields(this.dynamicFields);
			case ERM.PRODUCT: return this.selectorSrv.getProducts();
			case ERM.PROJECT: return this.selectorSrv.getProjects();
			case ERM.REQUEST_TEMPLATE: return this.selectorSrv.getRequestTemplates();
			case ERM.SELECTOR_ELEMENT:
				if (!this.definitionReference)
					throw Error('The selector `SelectorElement` needs a definitionReference to target');
				return this.selectorSrv.getSelectorElements(this.definitionReference);
			case ERM.SUPPLIER: return this.selectorSrv.getSuppliers();
			case ERM.SUPPLIER_TYPE: return this.selectorSrv.getSupplierTypes();
			case ERM.TAG: return this.selectorSrv.getTags();
			case ERM.USER: return this.selectorSrv.getUsers();
			case ERM.TEAM_USER: return this.selectorSrv.getTeamUsers().pipe(
				map(teamUsers => teamUsers.map(tu => tu.user))
			);
			case ERM.WEIGHT_UNIT: return this.selectorSrv.getWeigthUnits();

			default: throw Error(`Unsupported type${this.type} for selector`);
		}
	}

	/**
	 * this is called when we want to update the value
	 */
	onChange() {
		this.onChangeFn(this.value);
		if (!this.multiple)
			this.updateSingle();
		else
			this.updateMultiple();
	}

	/**
	 * Emits an array of new values so they can be updated and refetch the selector
	 */
	private updateMultiple() {
		let trimValues;
		switch (this.type) {
			case ERM.EMAIL:
				trimValues = this.value.map(v => v.email || v);
				break;
			case ERM.PRODUCT:
				trimValues = this.value.map(v => (
					{
						id: v.id,
						name: v.name,
						images: v.images ? v.images : null,
						supplier: v.supplier ? v.supplier : null,
						__typename: v.__typename
					}
				));
				break;
			case ERM.SELECTOR_ELEMENT:
				trimValues = this.value.map(v => (
					{
						id: v.id,
						value: v.value,
						__typename: v.__typename
					}
				));
				break;
			default:
				trimValues = this.value.map(v => ({ id: v.id, name: v.name, __typename: v.__typename }));
				break;
		}
		this.update.emit(trimValues);
		this.selectorSrv.refetch();
	}

	/**
	 * Emits the new single value so it can be updated
	 */
	private updateSingle() {
		let item;
		// depending on the entity the way we update it can be different (we only care to update the value that we display)
		switch (this.type) {
			case ERM.TEAM_USER:
			case ERM.USER:
				item = {
					id: this.value.id,
					firstName: this.value.firstName ? this.value.firstName : '',
					lastName: this.value.lastName ? this.value.lastName : '',
					__typename: this.value.__typename
				};
				break;
			case ERM.CONTACT:
				item = {
					id: this.value.id,
					email: this.value.email,
					supplier: this.value.supplier ? this.value.supplier : null,
					__typename: this.value.__typename
				};
				break;
			case ERM.SELECTOR_ELEMENT:
				item = {
					id: this.value.id,
					value: this.value.value,
					__typename: this.value.__typename
				};
				break;
			// if its a const we don't need to emit an object {id, typename} (its not an entity update),
			// we only need a string (e.g. supplier -> country -> string)
			case ERM.COUNTRY:
			case ERM.CURRENCY:
			case ERM.HARBOUR:
			case ERM.INCO_TERM:
			case ERM.LENGTH_UNIT:
			case ERM.PICKER_FIELD:
			case ERM.WEIGHT_UNIT:
				item = this.value;
				break;
			// this is the default if we are updating an entity with name field
			default:
				item = {
					id: this.value.id,
					name: this.value.name ? this.value.name : '',
					__typename: this.value.__typename
				};
				break;
		}
		if (item)
			this.update.emit(item);
		this.close.emit();
	}

	/**
	 * Upon selecting an item, we read a property, depending on the type, and we emit its new value and reset the input, d
	 * @param item selected item, which will be the new value
	 */
	onSelect(item) {
		let itemToReturn = item;
		switch (this.type) {
			case ERM.COUNTRY:
				itemToReturn = item.countryCode;
				break;
			case ERM.CURRENCY:
				itemToReturn = item.symbol;
				break;
			case ERM.PICKER_FIELD:
				itemToReturn = item.label || item.name;
				break;
			case ERM.HARBOUR:
			case ERM.INCO_TERM:
			case ERM.LENGTH_UNIT:
			case ERM.WEIGHT_UNIT:
				itemToReturn = item.name;
				break;
			default:
				itemToReturn = item;
				break;
		}

		if (this.multiple && !this.isStored(itemToReturn)) { // if its multiple and its not already on our sotred values we add it
			this.value.push(itemToReturn);
			this.onChange();
		} else if (!this.multiple) { // if not multiple we update and close
			this.value = itemToReturn;
			this.onChange();
		}
		this.resetInput();
	}

	/**
	 * checks if any of items match with the current searchText
	 * @param items items to check if they match with current searchText
	 * @returns list of items that match the current searchTxt
	 */
	private checkExist(items: any[]) {
		switch (this.type) {
			case ERM.EMAIL:
				return items.filter(it => it.name === this.searchTxt || it.email === this.searchTxt);
			default:
				return items.filter(it => it.name === this.searchTxt);
		}
	}

	/**
	 * Creates a new entity if its a supported type
	 */
	create() {
		let createObs$: Observable<any>;
		let added;
		const name = this.searchTxt;
		if (name) {
			switch (this.type) {
				case ERM.CATEGORY:
					added = new Category({ name });
					createObs$ = this.selectorSrv.createCategory(added);
					break;
				case ERM.EVENT:
					added = new Event({ name });
					createObs$ = this.selectorSrv.createEvent(added);
					break;
				case ERM.PRODUCT:
					added = new Product({ name });
					createObs$ = this.selectorSrv.createProduct(added);
					break;
				case ERM.PROJECT:
					added = new Project({ name });
					createObs$ = this.selectorSrv.createProject(added);
					break;
				case ERM.SUPPLIER:
					added = new Supplier({ name });
					createObs$ = this.selectorSrv.createSupplier(added);
					break;
				case ERM.SUPPLIER_TYPE:
					added = new SupplierType({ name });
					createObs$ = this.selectorSrv.createSupplierType(added);
					break;
				case ERM.TAG:
					added = new Tag({ name });
					createObs$ = this.selectorSrv.createTag(added);
					break;
				case ERM.CONTACT:
					if (RegExp(RegexpApp.EMAIL).test(name)) {
						added = new Contact({ email: name });
						createObs$ = this.selectorSrv.createContact(added);
					}
					break;
				case ERM.EMAIL:
					if (RegExp(RegexpApp.EMAIL).test(name))
						added = name;
					break;
				default:
					throw Error(`Unsupported type ${this.type}`);
			}
			// we add it directly to the value
			if (this.multiple && added) {
				this.value.push(added);
			} else if (!this.multiple)
				this.value = added;

			if (createObs$ === undefined)
				return;
			// we are using take 1 in srv, no need for fancy destroying
			createObs$.subscribe();
			// we changed the value directly so we have to notify the formControl
			this.onChange();
			this.selectorSrv.refetch();
			this.resetInput();
		}
	}

	/**
	 * handles how we manage the selection of choices using keyboard events and keymanager
	 * @param event keyboard event
	 */
	onKeydown(event: KeyboardEvent) {
		if (event.keyCode === ENTER && this.keyManager && this.keyManager.activeItem) {
			// we get the item label from each row selector
			const label = this.keyManager.activeItem.getLabel();
			const item = this.keyManager.activeItem.getItem();
			if (label === 'create-button') {
				this.create();
			} else if (this.multiple) {
				// this is made since sometimes the user types faster, this way we assure that the label he types has to be the same
				// if he moves with the arrow keys, then we don't care about the typing field
				if ((label === this.searchTxt) || this.movedArrow) {
					this.onSelect(item);
				}
			} else {
				this.onSelect(item);
			}

		} else if (event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
			// we use this number to know between how many rows navigated we have to scroll Into view
			// we set it to 5 since its the number of elements we see on the selector.
			const numberRows = 5;
			this.movedArrow = true;
			// active index
			let aIndex = this.keyManager.activeItemIndex;
			const items = this.elementRefItems.toArray();
			// we call this before the event key since we are going back with the arrow key up
			// this case happens when you have pressed 5 times DOWN_ARROW and you get scrollIntoView
			// then you press UP_ARROW, instead of scrolling into the active index, we have to scroll to the index 5 rows above
			// this way we generate the ilusion that we went up on the row sections (try it on app for more clarification)
			if (event.keyCode === UP_ARROW && aIndex % numberRows === 0)
				items[aIndex - numberRows > 0 ? aIndex - numberRows : 0].nativeElement.scrollIntoView();
			// register the move of the key
			this.keyManager.onKeydown(event);
			// get the new index
			aIndex = this.keyManager.activeItemIndex;
			// this case scenario is when you reach the last index of the item when going with up arrow key, we have to scroll to the last item
			if (event.keyCode === UP_ARROW && aIndex === items.length - 1)
				items[aIndex].nativeElement.scrollIntoView();
			// every numberRows we scroll to the next item
			if (event.keyCode === DOWN_ARROW && aIndex % numberRows === 0)
				items[aIndex].nativeElement.scrollIntoView();
		}
	}


	/**
	 * checks if the item matches with any of the values stored
	 * @param item
	 * @returns true if the current item is selected, flase otherwise
	 */
	// this method should only be used when multiple true, since we acces the value as an array
	private isStored(item: any) {
		let isSelected = false;
		if (!this.multiple)
			return isSelected;
		if (this.value && this.value.length) {
			switch (this.type) {
				case ERM.EMAIL:
					isSelected = !!this.value.find(value => value === item.email);
					break;
				default:
					isSelected = !!this.value.find(value => value.id === item.id);
					break;
			}
		}
		return isSelected;
	}

	/**
	 * checks if the name given matches with any of the values stored
	 * @param name
	 */
	// this method should only be used when multiple true, since we acces the value as an array
	private hasName(name: string) {
		let hasName = false;
		if (!this.multiple)
			return hasName;
		if (this.value && this.value.length) {
			switch (this.type) {
				case ERM.EMAIL:
					hasName = !!this.value.find(value => value.toLowerCase() === name);
					break;
				default:
					hasName = !!this.value.find(value => value.name.toLowerCase() === name);
					break;
			}
		}
		return hasName;
	}

	// this is only called when deleting from the current-values-container,
	// should only be used when multiple true
	/**
	 * deletes the item from the array of current values
	 * @param item item
	 */
	delete(item) {
		switch (this.type) {
			case ERM.EMAIL:
				this.value = this.value.filter(value => value !== item);
				break;
			default:
				this.value = this.value.filter(value => value.id !== item.id);
				break;
		}
		this.onChange();
	}

}
