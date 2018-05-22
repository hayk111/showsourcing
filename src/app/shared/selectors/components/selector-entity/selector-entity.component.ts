import { Component, OnInit, Input, ChangeDetectionStrategy, Output, ViewChild, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { SelectorsService } from '../../sercices/selectors.service';
import { CustomSelector } from '~shared/selectors/utils/custom-selector.class';
import { makeAccessorProvider, AbstractInput } from '~shared/inputs';
import { SelectorComponent } from '~shared/selectors/components/selector/selector.component';
import { Observable } from 'rxjs';
import { Choice } from '~shared/selectors/utils/choice.interface';


@Component({
	selector: 'selector-entity-app',
	templateUrl: './selector-entity.component.html',
	styleUrls: ['./selector-entity.component.scss'],
	providers: [makeAccessorProvider(SelectorEntityComponent), SelectorsService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorEntityComponent extends AbstractInput implements OnInit {

	@Input() type: string;
	@Input() canCreate = false;
	@Input() multiple = false;
	// value is the id of the entity
	@Input() value: any;
	@Input() itemName: string;
	@Output() select = new EventEmitter<string>();
	@Output() unselect = new EventEmitter<string>();
	@ViewChild('selector') selector: SelectorComponent;
	choices$: Observable<any[]>;

	constructor(private srv: SelectorsService, protected cd: ChangeDetectorRef) {
		super(cd);
	}

	ngOnInit() {
		this.setChoices();
	}

	open() {
		if (this.selector)
			this.selector.open();
	}

	onSelect(value: string) {
		this.select.emit(value);
		debugger;
		// to notify the formControl we need to call this
		this.onChangeFn(this.value);
	}

	onUnselect(value: string) {
		this.unselect.emit(value);

		if (this.multiple) {
			// to notify the formControl we need to call this
			this.onChangeFn(this.value);
		}

	}

	setChoices() {
		switch (this.type) {
			case 'country': this.choices$ = this.srv.getCountries(); break;
			case 'currency': this.choices$ = this.srv.getCurrencies(); break;
			case 'harbour': this.choices$ = this.srv.getHarbours(); break;
			case 'incoTerm': this.choices$ = this.srv.getIncoTerms(); break;
			case 'supplier': this.choices$ = this.srv.getSuppliers(); break;
			case 'category': this.choices$ = this.srv.getCategories(); break;
			case 'event': this.choices$ = this.srv.getEvents(); break;
			default: throw Error('Unsupported type');
		}
	}

}
