import { Tag } from './../../../../app-root/store/model/entities/tag.model';
import { take } from 'rxjs/operators';
import { Entity } from './../../../entity/models/entities.model';
import { Observable } from 'rxjs/Observable';
import {
	Component,
	OnInit,
	Input,
	EventEmitter,
	Output,
	ViewChild,
	ChangeDetectionStrategy,
	ViewChildren,
} from '@angular/core';
import { EntityRepresentation } from '~entity';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Patch } from '~entity/utils';
import { Project } from '~app/features/projects';
import { SelectorComponent } from '~app/shared/selectors/components/selector/selector.component';

@Component({
	selector: 'editable-field-app',
	templateUrl: './editable-field.component.html',
	styleUrls: ['./editable-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableFieldComponent implements OnInit {
	@Input() value;
	@Input() type = 'text';
	@Input() label: string;
	// whether the label is placed above or inlined with the value
	@Input() labelPosition: 'top' | 'inline' = 'top';
	@Input() isRightAligned = false;
	// the entity the editable field targets. This is used to display additional things instead of just the value
	// for example for the price we also display the currency
	@Input() entity: Entity;
	@Input() isCompactInline = false;
	// update will return the new value
	@Output() update = new EventEmitter<any>();
	// emitted when a tag is created
	@Output() tagCreate = new EventEmitter<string>();
	// select multiple we add and remove
	@Output() tagAdded = new EventEmitter<Tag>();
	@Output() tagRemoved = new EventEmitter<Tag>();
	@Output() projectAdded = new EventEmitter<Project>();
	@Output() projectRemoved = new EventEmitter<Project>();
	// when an editable field should be a selector we need it to open it on click
	@ViewChild(SelectorComponent) selector: SelectorComponent;
	editMode = false;
	// accumulator to save the new value, we will send an update even not on change but when the button save is clicked
	accumulator: string | number;

	constructor() { }

	ngOnInit() { }

	openEditMode() {
		this.editMode = true;
		// using setTimeout so we don't have a selector undefined
		setTimeout(() => { if (this.selector) this.selector.open(); }, 0);
	}

	closeEditMode() {
		this.editMode = false;
	}

	updateTags(value: Array<Tag>) {
		// this will be fired when a change event occur with ng select
		// however when we create a tag, a change is also fired but the id isn't ready yet
		if (!Array.isArray(value)) {
			return;
		}
		// if previous value is bigger we removed item
		if (this.value.length > value.length) {
			// the one removed is the one not included in the second array
			const removedId = this.value.find(v => !value.find(x => x.id === v));
			// since we only have the id we will send a lookalike Tag with just the id
			this.tagRemoved.emit({ id: removedId } as Tag);
		} else {
			// the one added is the one not included in the first array
			const addedItem = value.find(v => !(this.value as Array<any>).includes(v.id));
			this.tagAdded.emit(addedItem);
		}
	}

	updateProjects(value: Array<Project>) {
		// this will be fired when a change event occur with ng select
		// however when we create a tag, a change is also fired but the id isn't ready yet
		if (!Array.isArray(value)) {
			return;
		}
		// if previous value is bigger we removed item
		if (this.value.length > value.length) {
			// the one removed is the one not included in the second array
			const removedId = this.value.find(v => !value.find(x => x.id === v));
			this.projectRemoved.emit({ id: removedId } as Project);
		} else {
			// the one added is the one not included in the first array
			const addedItem = value.find(v => !(this.value as Array<any>).includes(v.id));
			this.projectAdded.emit(addedItem);
		}
	}



	updateValue(value: string) {
		this.accumulator = value;
	}

	onSave() {
		this.update.emit(this.accumulator);
		this.closeEditMode();
	}

	getSingular(type: string) {
		if (type === 'categories')
			return 'category';
		// removing the 's' at the end of a type
		else
			return type.substr(0, type.length - 1);
	}
}
