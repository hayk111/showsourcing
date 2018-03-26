import {
	Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter,
	Output, TemplateRef, ContentChild, ViewChild
} from '@angular/core';
import { Entity } from '~app/shared/entity';
import { NgSelectComponent } from '@ng-select/ng-select';

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
	@Input() canCreate = true;
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

	onChange(value: Entity | Array<Entity>) {
		if (this.multiple === true) {
			return this.onChangeMultiple(value as Array<Entity>);
		}
		this.select.emit(value as Entity);
	}

	// on a selector with multiple enabled, the value is an array of objects
	private onChangeMultiple(value: Array<Entity>) {
		const newIds = value.map(v => v.id);
		// if previous value is bigger we removed item
		if (this.value.length > newIds.length) {
			// the one removed is the one not included in the second array
			const removedId = (this.value as Array<string>).find(first => !newIds.find(second => second === first));
			const item = this.choices.find(choice => choice.id === removedId);
			// since we only have the id we will send a lookalike Tag with just the id
			this.unselect.emit(item);
		} else {
			// the one added is the one not included in the first array
			const addedId = newIds.find(id => !(this.value as Array<any>).includes(id));
			const item = this.choices.find(choice => choice.id === addedId);
			this.select.emit(item);
		}
	}

	onCreate() {
		this.create.emit(this.searchValue);
		this.searchValue = '';
	}

	filter() {
		this.filteredChoices = this.choices.filter(c => c.name.includes(this.searchValue));
	}

	open() {
		this.ngSelect.open();
	}

}
