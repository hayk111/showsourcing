import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	Output,
	TemplateRef,
	ViewChild,
} from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Category, Event, Supplier, SupplierType, Tag } from '~models';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';
import { SelectorComponent } from '~shared/selectors/components/selector/selector.component';
import { SelectorsService } from '~shared/selectors/sercices/selectors.service';
import { Choice } from '~shared/selectors/utils/choice.interface';


@Component({
	selector: 'selector-entity-app',
	templateUrl: './selector-entity.component.html',
	styleUrls: ['./selector-entity.component.scss'],
	providers: [makeAccessorProvider(SelectorEntityComponent), SelectorsService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorEntityComponent extends AbstractInput {
	/**  the type of entity we gonna select from. */
	@Input() set type(type: string) {
		this._type = type;
		this.type$.next(type);
	}
	get type(): string {
		return this._type;
	}
	private _type;
	private type$ = new ReplaySubject<string>(1);

	// whether multiple entities can be selectioned
	@Input() multiple = false;
	// value is the id of the entity
	@Input() value: any;
	// the name that will appear in the selector. EG: 'No "supplier" found', or 'create new "supplier"'.
	@Input() itemName = 'item';
	// events that emits the id of the entity
	/** This is the property name we are gonna display */
	@Input() propertyName = 'name';
	/** whether we can create a new entity */
	@Input() canCreate = true;
	// value displayed
	@Input() displayedValue: string;
	@Output() select = new EventEmitter<Choice>();
	@Output() unselect = new EventEmitter<Choice>();
	@Output() change = new EventEmitter<any>();
	@Output() blur = new EventEmitter<any>();
	@Output() closed = new EventEmitter<null>();
	@ViewChild(SelectorComponent) selector: SelectorComponent;
	@ViewChild('defaultTemplate') defaultTemplate: TemplateRef<any>;
	@ViewChild('userTemplate') userTemplate: TemplateRef<any>;
	/** available choices */
	choices$: Observable<any[]> = this.type$.pipe(
		distinctUntilChanged(),
		switchMap(type => this.getChoices(type))
	);

	constructor(private srv: SelectorsService, protected cd: ChangeDetectorRef) {
		super(cd);
	}

	/** opens the selector, is used when we want to open it programatically */
	open() {
		if (this.selector)
			this.selector.open();
	}

	onChange() {
		this.onChangeFn(this.value);
		this.change.emit(this.value);
	}

	onSelect(choice: Choice) {
		this.select.emit(choice);
	}

	onUnselect(choice: Choice) {
		this.unselect.emit(choice);
	}

	onBlur() {
		this.onTouchedFn();
		this.blur.emit();
	}

	onClose() {
		this.closed.emit();
	}

	getChoices(type: string) {
		switch (type) {
			case 'supplier': return this.srv.getSuppliers();
			case 'product': return this.srv.getProducts();
			case 'category': return this.choices$ = this.srv.getCategories();
			case 'event': return this.choices$ = this.srv.getEvents();
			case 'tag': return this.choices$ = this.srv.getTags();
			case 'supplierType': return this.choices$ = this.srv.getSupplierTypes();
			case 'user': return this.srv.getUsers();
			default: throw Error(`Unsupported type ${this.type}`);
		}
	}

	/** creates a new entity */
	create(name: string) {
		let createObs$: Observable<any>;
		let added;
		switch (this.type) {
			case 'supplier':
				added = new Supplier({ name });
				createObs$ = this.srv.createSupplier(added);
				break;
			case 'category':
				added = new Category({ name });
				createObs$ = this.srv.createCategory(added);
				break;
			case 'event':
				added = new Event({ name });
				createObs$ = this.srv.createEvent(added);
				break;
			case 'tag':
				added = new Tag({ name });
				createObs$ = this.srv.createTag(added);
				break;
			case 'supplierType':
				added = new SupplierType({ name });
				createObs$ = this.srv.createSupplierType(added);
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

	get template() {
		if (this.type === 'user')
			return this.userTemplate;
		return this.defaultTemplate;
	}

}
