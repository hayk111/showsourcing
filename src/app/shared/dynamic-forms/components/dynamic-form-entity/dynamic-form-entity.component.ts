import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Entity, EntityTarget, selectEntityById } from '~app/entity';
import { FormDescriptor, FormGroupDescriptor } from '../../utils/custom-field.model'
import { AutoUnsub } from '~utils';

@Component({
	selector: 'dynamic-form-entity-app',
	templateUrl: './dynamic-form-entity.component.html',
	styleUrls: ['./dynamic-form-entity.component.scss'],
})
export class DynamicFormEntityComponent extends AutoUnsub implements OnInit {
	@Input() target: EntityTarget;
	descriptor$: Observable<FormGroupDescriptor | FormDescriptor>;
	entity$: Observable<Entity>;

	constructor() {
		super();
	}

	ngOnInit() {
		this.entity$ = this.store.select(selectEntityById(this.target));
	}

	onUpdate(event) {
		// this.store.dispatch(CustomFieldsActions.patch(this.target, event.name, event.value));
	}
}
