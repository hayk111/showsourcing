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
import { Observable, ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product, Project, Supplier, Tag, Currency } from '~core/models';
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
		this.type$.next(type);
	}
	get type(): string {
		return this._type;
	}
	@Input() multiple = false;
	@Input() canCreate = false;

	@Output() update = new EventEmitter<any>();
	@Output() close = new EventEmitter<null>();

	private type$ = new ReplaySubject<string>(1);

	choices$: Observable<any[]> = this.type$.pipe(
		switchMap(type => this.getChoices(type, this.searchTxt))
	);
	topCurrencies$: Observable<Currency[]>;
	choicesLocal = [];

	/**
	 * items inside the virtual scroll that are needed for the cdk a11y selection with arrow keys
	 * each row on the virtual scroll has to implement the AbstractSelectorHighlightableComponent,
	 * since they keyManager needs it to update state of selection
	*/
	@ViewChildren(AbstractSelectorHighlightableComponent) virtualItems: QueryList<AbstractSelectorHighlightableComponent>;
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
	searchTxt = '';


	constructor(
		private selectorSrv: SelectorsService,
		protected cd: ChangeDetectorRef,
		private fb: FormBuilder
	) { super(cd); }

	ngOnInit() {
		this.group = this.fb.group({
			name: ['']
		});
		this.choicesLocal = this.getChoicesLocal(this.type, this.searchTxt);
	}
	ngAfterViewInit() {
		this.keyManager = new ActiveDescendantKeyManager(this.virtualItems).withWrap().withTypeAhead();
		this.inp.focus();
	}

	search(text) {
		this.searchTxt = text;
		this.hasDB ? this.type$.next(this.type) : this.choicesLocal = this.getChoicesLocal(this.type, this.searchTxt);
	}

	/**choices of the given type, remember to add a new selector row component if you add a new type or use an existign one */
	getChoices(type: string, searchTxt: string): Observable<any[]> {
		switch (type) {
			case 'supplier': return this.selectorSrv.getSuppliers(searchTxt);
			case 'product': return this.selectorSrv.getProducts(searchTxt);
			case 'category': return this.selectorSrv.getCategories(searchTxt);
			// case 'event': return this.selectorSrv.getEvents();
			case 'tag': return this.selectorSrv.getTags(searchTxt);
			case 'supplierType': return this.selectorSrv.getSupplierTypes(searchTxt);
			case 'user': return this.selectorSrv.getUsers(searchTxt);
			case 'project': return this.selectorSrv.getProjects(searchTxt);
			// Constants
			case 'currency':
				this.isConst = true;
				this.topCurrencies$ = this.selectorSrv.getTopCurrencies();
				return this.selectorSrv.getCurrenciesGlobal(searchTxt);
			case 'country':
				this.isConst = true;
				return this.selectorSrv.getCountriesGlobal(searchTxt);
			case 'harbour':
				this.isConst = true;
				return this.selectorSrv.getHarboursGlobal(searchTxt);
			case 'incoTerm':
				this.isConst = true;
				return this.selectorSrv.getIncoTermsGlobal(searchTxt);

			default: throw Error(`Unsupported type ${this.type}`);
		}
	}

	getChoicesLocal(type, searchTxt) {
		switch (type) {
			case 'lengthUnit':
				this.isConst = true;
				return this.selectorSrv.getLengthUnits(searchTxt);
			case 'widthUnit':
				this.isConst = true;
				return this.selectorSrv.getWeigthUnits(searchTxt);
			case 'businessType':
				this.isConst = true;
				return this.selectorSrv.getBusinessTypes(searchTxt);
			case 'categoryBoarding':
				this.isConst = true;
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
				else this.update.emit({ id: this.value.id, name: this.value.name ? this.value.name : '', __typename: this.value.__typename });
			} else this.update.emit(this.value);
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
			// this.keyManager.activeItem.getLabel();
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
