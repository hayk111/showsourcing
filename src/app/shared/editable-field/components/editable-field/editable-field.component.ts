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
import { Patch } from '~app/app-root/store';

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
	@Output() addEntity = new EventEmitter<any>();
	editMode = false;
	accumulator: string | number;

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

	addEntityCallback(name: string) {
		this.addEntity.emit(name);
	}

	updateMultipleEntities(value: Array<Entity>) {
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
