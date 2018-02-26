import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EntityTarget, Entity } from '~store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { AutoUnsub } from '~utils/index';
import { selectCustomField } from '~store/selectors/entities/custom-fields.selector';
import { Observable } from 'rxjs/Observable';
import { FormDescriptor, FormGroupDescriptor } from '../../utils/descriptors.interface';
import { selectEntity, selectEntityById } from '~store/selectors/misc/utils.selector';
import { CustomFieldsActions } from '~store/action/entities/index';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'dynamic-form-entity-app',
	templateUrl: './dynamic-form-entity.component.html',
	styleUrls: ['./dynamic-form-entity.component.scss']
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
