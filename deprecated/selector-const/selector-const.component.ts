import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';
import { Choice } from '~shared/selectors/utils/choice.interface';
import { SelectorsService } from '~shared/selectors/services/selectors.service';
import { SelectorDeprecatedComponent } from '~deprecated/selector-deprecated/selector-deprecated.component';




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

	// type e.g. country, check setChoices below
	@Input() type: string;
	// whether it can create a new entity
	@Input() canCreate = false;
	// whether multiple entities can be selectioned
	@Input() multiple = false;
	// value is the id of the entity
	@Input() value: any;
	// the name that will appear in the selector. EG: 'No "country" found', or 'create new "country"'.
	@Input() itemName = 'Item';
	// if we use a custom style or not, specified on the class of selector-app
	@Input() customStyle: string;
	// value displayed
	@Input() displayedValue: string;
	// events that emits the id of the entity
	@Output() select = new EventEmitter<Choice>();
	@Output() unselect = new EventEmitter<Choice>();
	@Output() change = new EventEmitter<any>();
	@Output() blur = new EventEmitter<any>();

	@ViewChild(SelectorDeprecatedComponent) selector: SelectorDeprecatedComponent;
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

	onChange(change) {
		this.onChangeFn(this.value);
		this.change.emit(this.value);
	}

	onBlur() {
		this.onTouchedFn();
		this.blur.emit();
	}

	onSelect(choice: Choice) {
		// to notify the formControl we need to call this
		this.select.emit(choice);
	}

	onUnselect(choice: Choice) {
		this.unselect.emit(choice);
	}

	setChoices() {
		switch (this.type) {
			case 'country': this.choices = this.srv.getCountries(); break;
			case 'currency': this.choices = this.srv.getCurrencies(); break;
			case 'harbour': this.choices = this.srv.getHarbours(); break;
			case 'incoTerm': this.choices = this.srv.getIncoTerms(); break;
			case 'lengthUnit': this.choices = this.srv.getLengthUnits(); break;
			case 'weightUnit': this.choices = this.srv.getWeigthUnits(); break;
			case 'businessType': this.choices = this.srv.getBusinessTypes(); break;
			case 'category': this.choices = this.srv.getCategoriesBoarding(); break;
			default: throw Error('Unsupported type');
		}
	}

}
