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
	Output,
	QueryList,
	ViewChild,
	ViewChildren,
	OnInit,
} from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product, Project, Supplier, Tag } from '~core/models';
import { AbstractInput, InputDirective } from '~shared/inputs';
import { SelectorsService } from '~shared/selectors/services/selectors.service';
import { AbstractSelectorHighlightableComponent } from '~shared/selectors/utils/abstract-selector-highlight.ablecomponent';

import { SelectorCurrencyRowComponent } from '../selector-currency-row/selector-currency-row.component';
import { FormGroup, FormBuilder } from '@angular/forms';

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
	}
	ngAfterViewInit() {
		this.keyManager = new ActiveDescendantKeyManager(this.virtualItems).withWrap().withTypeAhead();
	}

	search(text) {
		this.searchTxt = text;
		this.type$.next(this.type);
	}

	/**choices of the given type, remember to add a new selector row component if you add a new type or use an existign one */
	getChoices(type: string, searchTxt: string): Observable<any[]> {
		switch (type) {
			case 'supplier': return this.selectorSrv.getSuppliers(searchTxt);
			case 'product': return this.selectorSrv.getProducts(searchTxt);
			// case 'category': return this.selectorSrv.getCategories(searchTxt);
			// case 'event': return this.selectorSrv.getEvents();
			case 'tag': return this.selectorSrv.getTags(searchTxt);
			// case 'supplierType': return this.selectorSrv.getSupplierTypes();
			case 'user': return this.selectorSrv.getUsers(searchTxt);
			case 'currency': return this.selectorSrv.getCurrenciesGlobal(searchTxt);
			case 'project': return this.selectorSrv.getProjects(searchTxt);
			default: throw Error(`Unsupported type ${this.type}`);
		}
	}

	onChange() {
		this.onChangeFn(this.value);
		if (!this.multiple) {
			this.update.emit({ id: this.value.id, __typename: this.value.__typename });
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

	test(item) {
		console.log(item);
	}
}
