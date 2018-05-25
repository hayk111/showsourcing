import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';
import { SelectorComponent } from '~shared/selectors/components/selector/selector.component';
import { Choice } from '~shared/selectors/utils/choice.interface';

import { SelectorsService } from '../../sercices/selectors.service';


/** This selector differs from selector entity because instead of dealing with entities from graphql
 *  we are dealing with constants that are saved on the front end. Also return values must be the id
 *  of said constant
 */
@Component({
	selector: 'selector-const-app',
	templateUrl: './selector-const.component.html',
	styleUrls: ['./selector-const.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(SelectorConstComponent), SelectorsService],

})
export class SelectorConstComponent extends AbstractInput implements OnInit {

	@Input() type: string;
	// whether it can create a new entity
	@Input() canCreate = false;
	// whether multiple entities can be selectioned
	@Input() multiple = false;
	// value is the id of the entity
	@Input() value: any;
	// the name that will appear in the selector. EG: 'No "country" found', or 'create new "country"'.
	@Input() itemName: string;
	// events that emits the id of the entity
	@Output() select = new EventEmitter<string>();
	@Output() unselect = new EventEmitter<string>();
	@ViewChild(SelectorComponent) selector: SelectorComponent;
	choices: any[];

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

	onSelect(id: string) {
		// to notify the formControl we need to call this
		this.onChangeFn(this.value);
		this.select.emit(id);
	}

	onUnselect(id: string) {
		if (this.multiple) {
			// to notify the formControl we need to call this
			this.onChangeFn(this.value);
		}
		this.unselect.emit(id);
	}

	setChoices() {
		switch (this.type) {
			case 'country': this.choices = this.srv.getCountries(); break;
			case 'currency': this.choices = this.srv.getCurrencies(); break;
			case 'harbour': this.choices = this.srv.getHarbours(); break;
			case 'incoTerm': this.choices = this.srv.getIncoTerms(); break;
			default: throw Error('Unsupported type');
		}
	}

}
