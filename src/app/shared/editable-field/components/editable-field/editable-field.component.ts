import { Tag } from './../../../../app-root/store/model/entities/tag.model';
import { take } from 'rxjs/operators';
import { Entity } from './../../../entity/models/entities.model';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { EntityRepresentation } from '~entity';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Patch } from '~app/app-root/store';

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
	@Input() entities: Observable<Array<Entity>>;
	@Output() update = new EventEmitter<any>();
	@Output() addEntity = new EventEmitter<any>();
	editMode = false;
	entityName: string;
	entityUrl: string;
	textValue: string;
	mulitpleChoices: Array<Entity>;
	constructor() {}

	ngOnInit() {
		if (this.entities) {
			this.entities.subscribe(entities => {
				console.log(this.type);
				console.log(entities);
				if (entities.length > 0) {
					if (this.type === 'tags' || this.type === 'projects') {
						this.mulitpleChoices = entities.filter(entity => this.value.indexOf(entity.id) > -1);
					} else {
						const currentEntity: any = entities.filter(entity => entity.id === this.value)[0];
						if (currentEntity) {
							this.entityName = currentEntity.name;
							if (this.type === 'user-entity')
								this.entityUrl = currentEntity.preferences.profilePicture.urls.url_60x45;
						}
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

	addEntityCallback(name) {
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
}
