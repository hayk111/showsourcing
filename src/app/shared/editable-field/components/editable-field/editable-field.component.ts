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
} from '@angular/core';
import { EntityRepresentation } from '~entity';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Patch } from '~entity/utils';

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
	@Input() isRightAligned = false;
	@Input() entity: Entity;
	@Input() isCompactInline = false;
	@Input() entities: Observable<Array<Entity>>;
	@Output() update = new EventEmitter<any>();
	@Output() tagCreate = new EventEmitter<string>();
	@Output() tagAdded = new EventEmitter<string>();
	@Output() tagRemoved = new EventEmitter<string>();
	@ViewChild('tagSearch') tagSearch;
	editMode = false;
	accumulator: string | number;
	addTagCallback = (name: string) => this.addTag(name);

	constructor() {}

	ngOnInit() {}

	openEditMode() {
		this.editMode = true;
	}

	closeEditMode() {
		// so the blur event of the input fires
		// without this, the inputs isn't shown and the blur doesn't fire
		this.editMode = false;
	}

	addTag(name: string) {
		this.tagCreate.emit(name);
		this.tagSearch.nativeElement.value = '';
	}

	updateTags(value: Array<Tag>) {
		// this will be fired when a change event occur with ng select
		// however when we create a tag, a change is also fired but the id isn't ready yet
		if (!Array.isArray(value)) {
			return;
		}
		// if previous value is bigger we removed item
		if (this.value > value) {
			// const removedItem = value.find(v => (this.value as Array<any>).includes(v.id));
			// this.tagRemoved.emit(removedItem.id);
		} else {
		}
	}

	updateMultipleEntities(value: Array<Entity>) {
		// this will be fired when a change event occur with ng select
		// however when we create a tag, a change is also fired but the id isn't ready yet
		if (!Array.isArray(value)) {
			return;
		}

		// ng select gives back the new values, we only care about the ids of values
		this.update.emit(
			value.reduce((acc, o) => {
				acc.push(o.id);
				return acc;
			}, [])
		);
	}

	updateValue(value: string) {
		this.accumulator = value;
	}
}
