import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ContentChild,
	EventEmitter,
	Input,
	Output,
	TemplateRef,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { AbstractInput, InputDirective, makeAccessorProvider } from '~shared/inputs/components-directives';
import { Choice } from '~shared/selectors/utils/choice.interface';



@Component({
	selector: 'selector-app',
	templateUrl: './selector.component.html',
	styleUrls: ['./selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(SelectorComponent)],
	encapsulation: ViewEncapsulation.None,
	host: {
		'[class.boarding]': 'customStyle === "boarding"'
	}
})
export class SelectorComponent extends AbstractInput {
	// when we select one
	@Output() select = new EventEmitter<Choice>();
	@Output() unselect = new EventEmitter<Choice>();
	// when the create button is clicked we want to create an item with what's in the input as name.
	@Output() create = new EventEmitter<string>();
	@Output() change = new EventEmitter<any>();
	@Output() blur = new EventEmitter<any>();
	// string from input to search through the list of choices
	searchValue = '';
	@ViewChild('ngSelect') ngSelect: NgSelectComponent;
	@ViewChild(InputDirective) searchInp: InputDirective;
	// When the value is displayed, what property of the entity should be displayed. Default name
	@Input() bindLabel = 'name';
	@Input() bindValue;
	// reference to template transcluded
	@ContentChild(TemplateRef) template: TemplateRef<any>;
	// name displayed in messages
	@Input() itemName = 'Item';
	// whether we can add multiple items
	@Input() multiple: boolean;
	// whether the list is searchable
	@Input() canSearch = true;
	// whether we can create new items
	@Input() canCreate = false;
	// whether items must be hiden when picked
	@Input() hideSelected = true;
	// how items are compared, to find out if they are already selected
	@Input() compareWith = (a, b) => a.id === b.id;
	// the name of the custom style
	@Input() customStyle = false;
	// current item, to show on the selector bar
	@Input() currentItem;

	/* different choices that an user can pick **/

	@Input() set choices(value: Array<Choice>) { this._choices = value || []; this.filter(); }
	get choices() { return this._choices; }
	// tslint:disable-next-line:member-ordering
	private _choices: Array<Choice> = [];
	// tslint:disable-next-line:member-ordering
	filteredChoices = [];


	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	onChange(e) {
		this.onChangeFn(this.value);
		this.change.emit(this.value);
	}

	onSelect(choice: Choice) {
		this.select.emit(choice);
	}

	onUnselect(removeObj: { value: any, index: number }) {
		this.unselect.emit(removeObj.value);
	}

	onCreate() {
		this.create.emit(this.searchValue);
		this.searchValue = '';
		this.filter();
	}

	/** Finds values that contains the term searched */
	filter() {
		if (this.searchValue === '')
			this.filteredChoices = [...this.choices];
		else
			this.filteredChoices = this.choices.filter(c => {
				const searched = (c[this.bindLabel] as string).toLowerCase();
				const searchString = this.searchValue.toLowerCase();
				return searched.includes(searchString);
			});
	}

	open() {
		this.ngSelect.open();
	}

	onOpen() {
		// needs the set timeout else searchInp is undefined
		setTimeout(_ => {
			if (this.searchInp) {
				this.searchInp.focus();
			}
		});
	}

	onSearchEnter() {
		if (this.filteredChoices.length === 0 && this.canCreate && this.searchValue) {
			this.onCreate();
		}
	}

	onBlur() {
		this.onTouchedFn();
		this.blur.emit();
	}

	writeValue(value: any): void {
		super.writeValue(value);
	}

}
