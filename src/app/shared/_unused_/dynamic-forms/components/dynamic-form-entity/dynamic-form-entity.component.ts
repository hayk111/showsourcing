import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Entity, EntityTarget, FormDescriptor, FormGroupDescriptor, selectCustomField, selectEntityById } from '~entity';
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

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.descriptor$ = this.store.select(selectCustomField(this.target.entityRepr.descriptorName));
		this.entity$ = this.store.select(selectEntityById(this.target));
	}

	onUpdate(event) {
		// this.store.dispatch(CustomFieldsActions.patch(this.target, event.name, event.value));
	}
}
