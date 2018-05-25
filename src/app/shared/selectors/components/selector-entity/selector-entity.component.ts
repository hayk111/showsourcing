import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';
import { SelectorComponent } from '~shared/selectors/components/selector/selector.component';
import { Choice } from '~shared/selectors/utils/choice.interface';

import { SelectorsService } from '../../sercices/selectors.service';


@Component({
	selector: 'selector-entity-app',
	templateUrl: './selector-entity.component.html',
	styleUrls: ['./selector-entity.component.scss'],
	providers: [makeAccessorProvider(SelectorEntityComponent), SelectorsService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorEntityComponent extends AbstractInput implements OnInit {

	@Input() type: string;
	// whether multiple entities can be selectioned
	@Input() multiple = false;
	// value is the id of the entity
	@Input() value: any;
	// the name that will appear in the selector. EG: 'No "country" found', or 'create new "country"'.
	@Input() itemName: string;
	// events that emits the id of the entity
	@Output() select = new EventEmitter<Choice>();
	@Output() unselect = new EventEmitter<Choice>();
	@Output() change = new EventEmitter<any>();
	@ViewChild(SelectorComponent) selector: SelectorComponent;
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

	setChoices() {
		switch (this.type) {
			case 'supplier': this.choices$ = this.srv.getSuppliers(); break;
			case 'category': this.choices$ = this.srv.getCategories(); break;
			case 'event': this.choices$ = this.srv.getEvents(); break;
			case 'tag': this.choices$ = this.srv.getTags(); break;
			case 'supplierType': this.choices$ = this.srv.getSupplierTypes(); break;
			default: throw Error('Unsupported type');
		}
	}

	/** creates a new entity */
	create() {

	}

}
