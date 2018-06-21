import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
	TemplateRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';
import { SelectorComponent } from '~shared/selectors/components/selector/selector.component';
import { Choice } from '~shared/selectors/utils/choice.interface';

import { SelectorsService } from '../../sercices/selectors.service';
import { Supplier, Category, Event, Tag, SupplierType } from '~models';
import { takeUntil } from 'rxjs/operators';


@Component({
	selector: 'selector-entity-app',
	templateUrl: './selector-entity.component.html',
	styleUrls: ['./selector-entity.component.scss'],
	providers: [makeAccessorProvider(SelectorEntityComponent), SelectorsService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorEntityComponent extends AbstractInput implements OnInit {
	/**  the type of entity we gonna select from. */
	@Input() set type(type: string) {
		this._type = type;
		if (this._type === 'event') {
			this.propertyName = 'alias';
		}
	}
	get type(): string {
		return this._type;
	}
	private _type;

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
	@Output() select = new EventEmitter<Choice>();
	@Output() unselect = new EventEmitter<Choice>();
	@Output() change = new EventEmitter<any>();
	@Output() blur = new EventEmitter<any>();
	@ViewChild(SelectorComponent) selector: SelectorComponent;
	@ViewChild('defaultTemplate') defaultTemplate: TemplateRef<any>;
	@ViewChild('userTemplate') userTemplate: TemplateRef<any>;
	choices$: Observable<any[]>;


	constructor(private srv: SelectorsService, protected cd: ChangeDetectorRef) {
		super(cd);
	}

	ngOnInit() {
		this.setChoices();
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

	setChoices() {
		switch (this.type) {
			case 'supplier': this.choices$ = this.srv.getSuppliers(); break;
			case 'category': this.choices$ = this.srv.getCategories(); break;
			case 'event': this.choices$ = this.srv.getEvents(); break;
			case 'tag': this.choices$ = this.srv.getTags(); break;
			case 'supplierType': this.choices$ = this.srv.getSupplierTypes(); break;
			case 'user':
				this.choices$ = this.srv.getUsers();
				break;
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
				added = new Event({ alias: name });
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
