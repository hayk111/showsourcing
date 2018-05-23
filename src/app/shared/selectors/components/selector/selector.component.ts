import {
	Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter,
	Output, TemplateRef, ContentChild, ViewChild, ChangeDetectorRef
} from '@angular/core';
import { InputDecorator } from '@angular/core/src/metadata/directives';
import { AbstractInput, makeAccessorProvider, InputDirective } from '~shared/inputs/components-directives';
import { Choice } from '../../utils/choice.interface';
import { NgSelectComponent } from '@ng-select/ng-select';



@Component({
	selector: 'selector-app',
	templateUrl: './selector.component.html',
	styleUrls: ['./selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(SelectorComponent)]
})
export class SelectorComponent extends AbstractInput {
	// when we select one
	@Output() select = new EventEmitter<Choice>();
	@Output() unselect = new EventEmitter<Choice>();
	// when the create button is clicked we want to create an item with what's in the input as name.
	@Output() create = new EventEmitter<string>();
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
	@Input() canSearch: boolean = true;
	// whether we can create new items
	@Input() canCreate = false;
	// whether items must be hiden when picked
	@Input() hideSelected = true;

	/* different choices that an user can pick **/
	@Input() set choices(value: Array<Choice>) { this._choices = value || []; this.filter(); }
	get choices() { return this._choices; }
	private _choices: Array<Choice> = [];
	filteredChoices = [];

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	/** when selecting a choice */
	onSelect(choice: Choice) {
		// we emit the value of the choice picked
		this.select.emit(choice);
		if (this.onChangeFn) {
			if (this.multiple) {
				// the onselect is triggered before ngselects makes the change
				this.onChangeFn([...(this.value || []), choice]);
			} else {
				this.onChangeFn(choice);
			}
		}

	}

	onUnselect(removeObj: { value: any, index: number }) {
		if (this.onChangeFn) {
			this.onChangeFn(this.value.filter(c => c.id !== removeObj.value.id));
		}
		this.unselect.emit(removeObj.value);
	}

	onCreate() {
		this.create.emit(this.searchValue);
		this.searchValue = '';
	}

	/** Finds values that contains the term searched */
	filter() {
		if (this.searchValue === '')
			this.filteredChoices = [...this.choices];
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
		setTimeout(() => {
			if (this.searchInp) {
				this.searchInp.focus();
			}
		}, 0);

	}

}
