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
	OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Category, Contact, EntityMetadata, ERM, Event, Product, Project, Supplier, SupplierType, Tag } from '~core/erm';
import { DynamicField } from '~shared/dynamic-forms';
import { FilterList } from '~shared/filters/models/filter-list.class';
import { AbstractInput, InputDirective } from '~shared/inputs';
import { SelectorsService } from '~shared/selectors/services/selectors.service';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlightable.component';
import { ListFuseHelperService } from '~core/list-page2/list-fuse-helper.service';
import { ListHelperService } from '~core/list-page2/list-helper.service';
import { FilterService } from '~core/filters';
import { Typename } from '~core/erm3/typename.type';
import { ID, RegexpApp } from '~utils';
import { filterTypeToTypename } from '~shared/filters/components';
import { isLocalList } from '~core/list-page2/is-local-list.function';
import { PropertyOptionsService } from '~shared/selectors/services/property-options.service';

@Component({
	selector: 'selector-picker-app',
	templateUrl: './selector-picker.component.html',
	styleUrls: ['./selector-picker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorPickerComponent extends AbstractInput implements OnInit, AfterViewInit, OnChanges {
	@Input() typename: Typename;
	@Input() customType: string;
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

	choicesSubscription: Subscription;

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
		private fuseHelperSrv: ListFuseHelperService,
		private listHelperSrv: ListHelperService,
		private propertyOptionSrv: PropertyOptionsService,
		private filterSrv: FilterService,
		protected cd: ChangeDetectorRef,
		private fb: FormBuilder
	) { super(cd); }

	ngOnInit() {
		this.group = this.fb.group({
			name: ['']
		});

		this.filterSrv.setup([], ['name']);

		if (this.typename === 'PropertyOption') {
			this.choices$ = this.propertyOptionSrv.listPropertyOptions(this.customType as Typename);
			this.cd.markForCheck();
		} else {
			if (isLocalList(this.typename)) {
				this.fuseHelperSrv.setup(this.typename);
				this.choices$ = this.fuseHelperSrv.paginedItems$;
				this.cd.markForCheck();
			} else {
				this.listHelperSrv.setup(this.typename);
				this.choices$ = this.listHelperSrv.filteredItems$;
				this.cd.markForCheck();
			}
		}

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

		// this.initializeChoices();

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
		if (this.choices$ && this.multiple) {
			// if its multiple we want to filter the values that we have currently selected, so they don't appear on the options
			this.choices$.pipe(map((items) => this.filterValues(items)));
		}
	}

	/**
	 * when the selector has multiple choice, we call this function to filter choices
	 * so the elements inside the value (array), does not appear on the choices
	 * @param items
	 */
	private filterValues(items: any[]) {
		return items.filter(i =>
			// if the array exists we check that the item does not exist on the value array
			(this.value) ? !((this.value).some(val => val.id === i.id)) : true);
	}

	/**
	 * resets input, focus input and reset search
	 */
	private resetInput() {
		this.inp.control.reset();
		this.inp.focus();
	}

	/**
	 * search a text and set first item active on selector
	 * @param text
	 */
	search(text, setFirstItemActive = true) {
		this.searchTxt = text.trim();
		this.movedArrow = false;

		this.filterSrv.search(this.searchTxt);
		this.searched$.next(this.searchTxt);
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
		switch (this.typename) {
			case 'Product':
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
			default:
				trimValues = this.value.map(v => ({ id: v.id, name: v.name, __typename: v.__typename }));
				break;
		}
		this.update.emit(trimValues);
	}

	/**
	 * Emits the new single value so it can be updated
	 */
	private updateSingle() {
		let item;
		// depending on the entity the way we update it can be different (we only care to update the value that we display)
		switch (this.typename) {
			case 'TeamUser':
			case 'User':
				item = {
					id: this.value.id,
					firstName: this.value.firstName ? this.value.firstName : '',
					lastName: this.value.lastName ? this.value.lastName : '',
					__typename: this.value.__typename
				};
				break;
			case 'Contact':
				item = {
					id: this.value.id,
					email: this.value.email,
					supplier: this.value.supplier ? this.value.supplier : null,
					__typename: this.value.__typename
				};
				break;
			// if its a const we don't need to emit an object {id, typename} (its not an entity update),
			// we only need a string (e.g. supplier -> country -> string)
			case 'Constant':
				item = this.value;
				break;
			// this is the default if we are updating an entity with name field
			default:
				item = {
					id: this.value.id,
					name: this.value.name ? this.value.name : '',
					__typename: this.value.__typename,
					status: {...this.value.status}
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
		switch (this.typename) {
			case 'Constant':
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
		return items.filter(it => it.name === this.searchTxt);
	}

	/**
	 * Creates a new entity if its a supported type
	 */
	create() {
		let createObs$: Observable<any>;
		let added;
		const name = this.searchTxt;
		if (name && this.typename) {
			added = { name };
			createObs$ = this.selectorSrv.create(this.typename, added);

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
			isSelected = !!this.value.find(value => value.id === item.id);
		}
		return isSelected;
	}

	capitalizeFirstLetter(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
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
			hasName = !!this.value.find(value => value.name.toLowerCase() === name);
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
		this.value = this.value.filter(value => value.id !== item.id);
		this.onChange();
	}

}
