import {
	Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter,
	Output, TemplateRef, ContentChild, ViewChild
} from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Entity } from '~app/entity';
import { InputDecorator } from '@angular/core/src/metadata/directives';
import { InputDirective } from '../input.directive';

@Component({
	selector: 'selector-app',
	templateUrl: './selector.component.html',
	styleUrls: ['./selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorComponent {
	// when we select one
	@Output() select = new EventEmitter<Entity>();
	@Output() unselect = new EventEmitter<Entity>();
	// when the create button is clicked we want to create an item with what's in the input as name.
	@Output() create = new EventEmitter<string>();
	// string from input to search through the list of choices
	searchValue = '';
	@ViewChild('ngSelect') ngSelect: NgSelectComponent;
	@ViewChild(InputDirective) searchInp: InputDirective;
	// When the value is displayed, what property of the entity should be displayed. Default name
	@Input() propName = 'name';
	// reference to template transcluded
	@ContentChild(TemplateRef) template: TemplateRef<any>;
	// name displayed in messages
	@Input() itemName = 'Item';
	// current value
	@Input() value: string | Array<string>;
	// whether we can add multiple items
	@Input() multiple: boolean;
	// whether the list is searchable
	@Input() canSearch: boolean;
	// whether we can create new items
	@Input() canCreate = false;
	// for async items whether they are still being loaded or not
	@Input() pending: boolean;
	// whether items must be hiden when picked
	@Input() hideSelected = true;

	/* different choices that an user can pick **/
	@Input() set choices(value: Array<Entity>) { this._choices = value; this.filter(); }
	get choices() { return this._choices; }
	private _choices: Array<Entity>;
	filteredChoices = [];

	constructor() { }

	onSelect(value: Entity) {

		this.select.emit(value);
	}

	onUnselect(removeObj: { value: any }) {
		this.unselect.emit(removeObj.value);
	}

	onCreate() {
		this.create.emit(this.searchValue);
		this.searchValue = '';
	}

	filter() {
		this.filteredChoices = this.choices.filter(c => c[this.propName].includes(this.searchValue));
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
