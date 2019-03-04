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
	Input,
	OnInit,
	Output,
	QueryList,
	ViewChild,
	ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Category, Event, Product, Project, Supplier, SupplierType, Tag, EntityMetadata, ERM } from '~core/models';
import { AbstractInput, InputDirective } from '~shared/inputs';
import { SelectorsService } from '~shared/selectors/services/selectors.service';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlight.ablecomponent';

@Component({
	selector: 'selector-picker-app',
	templateUrl: './selector-picker.component.html',
	styleUrls: ['./selector-picker.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorPickerComponent extends AbstractInput implements OnInit, AfterViewInit {

	private _type: EntityMetadata;
	@Input() set type(type: EntityMetadata) {
		this._type = type;
	}
	get type(): EntityMetadata {
		return this._type;
	}
	@Input() multiple = false;
	@Input() canCreate = false;

	@Output() update = new EventEmitter<any>();
	@Output() close = new EventEmitter<null>();


	/** choices to iterate */
	choices$: Observable<any[]>;
	/** local choices to iterate, these choices are not in our DB */
	choicesLocal = [];

	/**
	 * items inside the virtual scroll that are needed for the cdk a11y selection with arrow keys
	 * each row on the virtual scroll has to implement the AbstractSelectorHighlightableComponent,
	 * since they keyManager needs it to update state of selection
	*/
	// for some reason it doesnt work without the string
	@ViewChildren('abstract') virtualItems: QueryList<AbstractSelectorHighlightableComponent>;
	/** Exact same list but with elementRef type so it can be scrolles */
	@ViewChildren('abstract', { read: ElementRef }) elementRefItems: QueryList<ElementRef>;
	/** cdk virtual scroll viewport so we can determine the scroll index in combination with cdk a11y */
	@ViewChild(CdkVirtualScrollViewport) cdkVirtualScrollViewport: CdkVirtualScrollViewport;

	@ViewChild(InputDirective) inp: InputDirective;
	group: FormGroup;


	/** key manager that controlls the selection with arrowkeys  */
	keyManager: ActiveDescendantKeyManager<AbstractSelectorHighlightableComponent>;
	/** index when using manager keys and virtual scrolling */
	count = 0;

	/** if current type is in our DB or not */
	hasDB = false;

	searched$: Subject<string> = new Subject();
	searchTxt = '';

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
		this.choicesLocal = this.getChoicesLocal(this.type, this.searchTxt);
		if (this.hasDB) {
			// if its multiple we want to filter the values that we have currently selected, so they don't appear on the options
			if (this.multiple)
				this.choices$ = this.getChoices(this.type).pipe(
					map((items) =>
						// only items that are not on the value array so they don't appear in the options
						items.filter(i =>
							// if the array exists we check that the item does not exist on the value array
							(this.value) ? !((this.value).some(val => val.id === i.id)) : true)
					)
				);
			else
				this.choices$ = this.getChoices(this.type);
		}
		if (this.canCreate) this.nameExists$ = this.searched$.pipe(
			switchMap(_ => this.choices$.pipe(
				map(m => m.filter(it => it.name === this.searchTxt)),
				// if text is found on choices$ OR
				// if the text is empty OR
				// if the text is inside the value array (only multiple allowed)
				map(m => (!!m.length || !this.searchTxt || this.hasName(this.searchTxt)))
			))
		);
	}

	ngAfterViewInit() {
		this.keyManager = new ActiveDescendantKeyManager(this.virtualItems).withWrap().withTypeAhead();
		this.inp.focus();
		this.searched$.next(this.searchTxt);
	}

	resetInput() {
		this.inp.control.reset();
		this.inp.focus();
		this.search('');
	}

	search(text) {
		this.searchTxt = text.trim();
		this.movedArrow = false;
		this.hasDB ? this.selectorSrv.search(this.type, this.searchTxt) : this.choicesLocal = this.getChoicesLocal(this.type, this.searchTxt);
		this.searched$.next(this.searchTxt);
		this.keyManager.setFirstItemActive();
	}

	/**choices of the given type, remember to add a new selector row component if you add a new type or use an existign one */
	// ARRAYS START AT 1 NOT 0!!!! now that I have your attention ADVICE: when adding a new choice, check the update single method
	getChoices(type: EntityMetadata): Observable<any[]> {
		switch (type) {
			case ERM.CATEGORY: return this.selectorSrv.getCategories();
			case ERM.COUNTRY: return this.selectorSrv.getCountriesGlobal();
			case ERM.CURRENCY: return this.selectorSrv.getCurrenciesGlobal();
			case ERM.EVENT: return this.selectorSrv.getEvents();
			case ERM.HARBOUR: return this.selectorSrv.getHarboursGlobal();
			case ERM.INCOTERM: return this.selectorSrv.getIncoTermsGlobal();
			case ERM.PRODUCT: return this.selectorSrv.getProducts();
			case ERM.PROJECT: return this.selectorSrv.getProjects();
			case ERM.SUPPLIER: return this.selectorSrv.getSuppliers();
			case ERM.SUPPLIER_TYPE: return this.selectorSrv.getSupplierTypes();
			case ERM.TAG: return this.selectorSrv.getTags();
			case ERM.USER: return this.selectorSrv.getUsers();

			default: throw Error(`Unsupported type${this.type} for selector`);
		}
	}

	/** Choices that are not registered on out DB */
	getChoicesLocal(type: EntityMetadata, searchTxt) {
		switch (type) {
			case ERM.LENGTH_UNIT: return this.selectorSrv.getLengthUnits(searchTxt);
			case ERM.WEIGHT_UNIT: return this.selectorSrv.getWeigthUnits(searchTxt);
			default: this.hasDB = true;
		}
	}

	onChange() {
		this.onChangeFn(this.value);
		if (!this.multiple)
			this.updateSingle();
		else
			this.updateMultiple();
	}

	updateMultiple() {
		const trimValues = this.value.map(v => ({ id: v.id, name: v.name, __typename: v.__typename }));
		this.update.emit(trimValues);
		this.selectorSrv.refetch();
	}

	updateSingle() {
		let item;
		// depending on the entity the way we update it can be different (we only care to update the value that we display)
		switch (this.type) {
			case ERM.USER:
				item = {
					id: this.value.id,
					firstName: this.value.firstName ? this.value.firstName : '',
					lastName: this.value.lastName ? this.value.lastName : '',
					__typename: this.value.__typename
				};
				break;
			// if its a const we don't need to emit an object {id, typename} (its not an entity update),
			// we only need a string (e.g. supplier -> country -> string)
			case ERM.COUNTRY:
			case ERM.CURRENCY:
			case ERM.HARBOUR:
			case ERM.INCOTERM:
			case ERM.LENGTH_UNIT:
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
		if (item) this.update.emit(item);
		this.close.emit();
	}

	onSelect(item) {
		if (this.multiple) {
			if (!this.isSelected(item)) { // if its multiple and its not selected we add it
				this.value.push(item);
				this.onChange();
			}
		} else { // we update and close
			this.value = item;
			this.onChange();
		}
	}

	/** creates a new entity */
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
				default: throw Error(`Unsupported type ${this.type}`);
			}
			// we add it directly to the value
			if (this.multiple)
				this.value.push(added);
			else
				this.value = added;
			// we are using take 1 in srv, no need for fancy destroying
			createObs$.subscribe();
			// we changed the value directly so we have to notify the formControl
			this.onChange();
			this.selectorSrv.refetch();
		}
	}

	getLabelName(label) {
		if (!label.name)
			throw Error('This entity selector does not have a name property when using multiple, check onkeyDoen else if (this.multiple)');
		return label.name;
	}

	onKeydown(event) {
		if (event.keyCode === ENTER) {
			// we get the item label from each row selector
			const label = this.keyManager.activeItem.getLabel();
			let shouldReset = true;
			if (label === 'create-button') this.create();
			else if (this.multiple) {
				// this is made since sometimes the user types faster, this way we assure that the label he types has to be the same
				// if he moves with the arrow keys, then we don't care about the typing field
				if (this.getLabelName(label) === this.searchTxt || this.movedArrow) this.onSelect(label);
				else shouldReset = false;
			} else this.onSelect(label);

			if (shouldReset) this.resetInput();

		} else if (event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
			this.movedArrow = true;
			let aIndex = this.keyManager.activeItemIndex;
			const items = this.elementRefItems.toArray();
			// we call this before the event key sicne we are going back with the arrow key up
			if (event.keyCode === UP_ARROW && aIndex % 5 === 0) items[aIndex - 5 > 0 ? aIndex - 5 : 0].nativeElement.scrollIntoView();
			// register the move of the key
			this.keyManager.onKeydown(event);
			// get the new index
			aIndex = this.keyManager.activeItemIndex;
			// this case scenario is when you reach the last index of the item when going with up arrow key, we have to scroll to the last item
			if (event.keyCode === UP_ARROW && aIndex === items.length - 1) items[aIndex].nativeElement.scrollIntoView();
			// every 5 rows we scroll to the next item
			if (event.keyCode === DOWN_ARROW && aIndex % 5 === 0) items[aIndex].nativeElement.scrollIntoView();
		}
	}

	/** this method should only be used when multiple true, since we acces the value as an array 	*/
	/** checks if the item matches with any of the values stored */
	isSelected(item: any) {
		let isSelected = false;
		if (!this.multiple) return isSelected;
		if (this.value && this.value.length) {
			isSelected = !!this.value.find(value => value.id === item.id);
		}
		return isSelected;
	}

	/** this method should only be used when multiple true, since we acces the value as an array 	*/
	/** checks if the name given matches with any of the values stored */
	hasName(name: string) {
		let hasName = false;
		if (!this.multiple) return hasName;
		if (this.value && this.value.length) {
			hasName = !!this.value.find(value => value.name === name);
		}
		return hasName;
	}

	/** this is only called when deleting from the current-values-container */
	delete(item) {
		this.value = this.value.filter(value => value.id !== item.id);
		this.onChange();
	}

	/** we needed this in case we want to display multiple items active class, for some reason with ngClass didn't work */
	getActiveClass(item) {
		if (!this.multiple) return [];
		return this.isSelected(item) ? ['active'] : [];
	}
}
