import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
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


	choices$: Observable<any[]>;

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
	hasDB = false;
	searched$: Subject<string> = new Subject();
	searchTxt = '';

	isMatch$: Observable<boolean>;


	constructor(
		protected selectorSrv: SelectorsService,
		protected cd: ChangeDetectorRef,
		private fb: FormBuilder
	) { super(cd); }

	ngOnInit() {
		this.group = this.fb.group({
			name: ['']
		});
		this.choicesLocal = this.getChoicesLocal(this.type, this.searchTxt);
		if (this.hasDB) this.choices$ = this.getChoices(this.type);
		if (this.canCreate) this.isMatch$ = this.searched$.pipe(
			switchMap(_ => this.choices$.pipe(
				map(m => m.filter(it => it.name === this.searchTxt)),
				map(m => !m.length)
			))
		);
	}

	ngAfterViewInit() {
		this.keyManager = new ActiveDescendantKeyManager(this.virtualItems).withWrap().withTypeAhead();
		this.inp.focus();
	}

	search(text) {
		this.searchTxt = text;
		this.hasDB ? this.selectorSrv.search(this.type, text) : this.choicesLocal = this.getChoicesLocal(this.type, this.searchTxt);
		this.searched$.next(this.searchTxt);
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
			if (!this.isConst) { // constants can update directly
				if (this.type === 'user')
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
		} else
			this.update.emit(this.value);
	}

	onSelect(item) {
		if (this.multiple) {
			if (this.isSelected(item))
				this.delete(item);
			else {
				this.value.push(item);
				this.onChange();
			}
		} else {
			this.value = item;
			this.onChange();
		}

	}

	onUnselect(item) {
		if (this.multiple && !this.isSelected(item)) {
			this.value.push(item);
		}
		this.onChange();
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

	/** CDK virtual scroll needs the height of the element */
	getHeight() {
		switch (this.type) {
			case 'supplier': return 64;
			default: return 37;
		}
	}

	onKeydown(event) {
		if (event.keyCode === ENTER) {
			// here add the item selected to the value
			const label = this.keyManager.activeItem.getLabel();
			if (label === 'create-button') this.create();
			else this.onSelect(label);
		} else if (event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
			this.keyManager.onKeydown(event);
		}
	}

	/** these method should only be used when multiple true */
	isSelected(item: any) {
		if (!this.multiple) return false;
		if (this.value && this.value.length) {
			return !!this.value.find(value => value.id === item.id);
		}
		return false;
	}

	/** this is only called when deleting from the current-values-container */
	delete(item) {
		this.value = this.value.filter(value => value.id !== item.id);
		this.onChange();
	}

	getActiveClass(item) {
		if (!this.multiple) return [];
		return this.isSelected(item) ? ['active'] : [];
	}
}
