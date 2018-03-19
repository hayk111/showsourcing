import { take } from 'rxjs/operators';
import { Entity } from './../../../entity/models/entities.model';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { EntityRepresentation } from '~entity';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
	selector: 'editable-field-app',
	templateUrl: './editable-field.component.html',
	styleUrls: ['./editable-field.component.scss'],
})
export class EditableFieldComponent implements OnInit {
	@Input() value;
	@Input() type = 'text';
	@Input() label: string;
	@Input() isRightAligned = false;
	@Output() update = new EventEmitter<any>();
	@Input() entities: Observable<Array<Entity>>;
	editMode = false;
	entityName: string;
	entityUrl: string;
	textValue: string;
	constructor() {}

	ngOnInit() {
		if (this.entities) {
			this.entities.subscribe(entities => {
				if (entities.length > 0) {
					const currentEntity: any = entities.filter(entity => entity.id === this.value)[0];
					if (currentEntity) {
						this.entityName = currentEntity.name;
						if (this.type === 'user-entity')
							this.entityUrl = currentEntity.preferences.profilePicture.urls.url_60x45;
					}
				}
			});
		}
	}

	openEditMode() {
		this.editMode = true;
	}

	closeEditMode() {
		// so the blur event of the input fires
		// without this, the inputs isn't shown and the blur doesn't fire
		setTimeout(() => (this.editMode = false), 0);
	}

	updateValue(value: string) {
		this.textValue = value;
	}
}
