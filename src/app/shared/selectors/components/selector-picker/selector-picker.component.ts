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
import { Category, Product, Project, Supplier, Tag } from '~core/models';
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

	private _type;
	@Input() set type(type: string) {
		this._type = type;
	}
	get type(): string {
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
	// for complex names
	displayName = '';

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

	/** whther the type that we send is a const or not
	 * if its a const we don't need to emit an object {id, typename}, we only need a string
	 */
	isConst = false;
	/** if current type is in our DB or not */
	hasDB = false;

	searched$: Subject<string> = new Subject();
	searchTxt = '';

	/** whether the search has a exact match or not to display the create button */
	nameExists$: Observable<boolean>;


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

	search(text) {
		this.searchTxt = text.trim();
		this.hasDB ? this.selectorSrv.search(this.type, this.searchTxt) : this.choicesLocal = this.getChoicesLocal(this.type, this.searchTxt);
		this.searched$.next(this.searchTxt);
		this.keyManager.setFirstItemActive();
	}

	/**choices of the given type, remember to add a new selector row component if you add a new type or use an existign one */
	getChoices(type: string): Observable<any[]> {
		switch (type) {
			case 'supplier': return this.selectorSrv.getSuppliers();
			case 'product': return this.selectorSrv.getProducts();
			case 'category': return this.selectorSrv.getCategories();
			// case 'event': return this.selectorSrv.getEvents();
			case 'tag': return this.selectorSrv.getTags();
			case 'supplierType':
				this.displayName = 'supplier type';
				return this.selectorSrv.getSupplierTypes();
			case 'user': return this.selectorSrv.getUsers();
			case 'project': return this.selectorSrv.getProjects();
			// Constants
			case 'currency':
				this.isConst = true;
				return this.selectorSrv.getCurrenciesGlobal();
			case 'country':
				this.isConst = true;
				return this.selectorSrv.getCountriesGlobal();
			case 'harbour':
				this.isConst = true;
				return this.selectorSrv.getHarboursGlobal();
			case 'incoTerm':
				this.isConst = true;
				return this.selectorSrv.getIncoTermsGlobal();

			default: throw Error(`Unsupported type ${this.type}`);
		}
	}

	/** Choices that are not registered on out DB */
	getChoicesLocal(type, searchTxt) {
		switch (type) {
			case 'lengthUnit':
				this.isConst = true;
				this.displayName = 'length unit';
				return this.selectorSrv.getLengthUnits(searchTxt);
			case 'weightUnit':
				this.isConst = true;
				this.displayName = 'weight unit';
				return this.selectorSrv.getWeigthUnits(searchTxt);
			case 'businessType':
				this.isConst = true;
				this.displayName = 'business type';
				return this.selectorSrv.getBusinessTypes(searchTxt);
			case 'categoryBoarding':
				this.isConst = true;
				this.displayName = 'category';
				return this.selectorSrv.getCategoriesBoarding(searchTxt);
			default: this.hasDB = true;
		}
	}

	onChange() {
		this.onChangeFn(this.value);
		if (!this.multiple) {
			if (!this.isConst) { // constants can update directly, wihtout a value name
				if (this.type === 'user') // specific user case, since the rest use name to update
					this.update.emit({
						id: this.value.id,
						firstName: this.value.firstName ? this.value.firstName : '',
						lastName: this.value.lastName ? this.value.lastName : '',
						__typename: this.value.__typename
					});
				else
					this.update.emit({ id: this.value.id, name: this.value.name ? this.value.name : '', __typename: this.value.__typename });
			} else
				this.update.emit(this.value);
			this.close.emit();
		} else {
			const trimValues = this.value.map(v => ({ id: v.id, name: v.name, __typename: v.__typename }));
			this.update.emit(trimValues);
			this.selectorSrv.refetch();
		}
	}

	onSelect(item) {
		if (this.multiple) {
			if (this.isSelected(item)) // if its multiple and is already on the selection we delete the item from our value array
				this.delete(item);
			else { // if its multiple and its not selected we add it
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
		switch (this.type) {
			case 'supplier':
				added = new Supplier({ name });
				createObs$ = this.selectorSrv.createSupplier(added);
				break;
			case 'project':
				added = new Project({ name });
				createObs$ = this.selectorSrv.createProject(added);
				break;
			case 'product':
				added = new Product({ name });
				createObs$ = this.selectorSrv.createProduct(added);
				break;
			case 'tag':
				added = new Tag({ name });
				createObs$ = this.selectorSrv.createTag(added);
				break;
			case 'category':
				added = new Category({ name });
				createObs$ = this.selectorSrv.createCategory(added);
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

	onKeydown(event) {
		if (event.keyCode === ENTER) {
			// we get the item label from each row selector
			const label = this.keyManager.activeItem.getLabel();
			if (label === 'create-button') this.create();
			else this.onSelect(label);
		} else if (event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
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
