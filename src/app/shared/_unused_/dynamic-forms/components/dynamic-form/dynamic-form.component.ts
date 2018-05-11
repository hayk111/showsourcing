import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Entity } from '~entity';
import { AutoUnsub } from '~utils';

import { DynamicFormsService } from '../../services/dynamic-forms.service';
import { FormDescriptor } from '~entity';

@Component({
	selector: 'dynamic-form-app',
	templateUrl: './dynamic-form.component.html',
	styleUrls: ['./dynamic-form.component.scss'],
	providers: [DynamicFormComponent],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent extends AutoUnsub {
	@Output() update = new EventEmitter<any>();
	@Input() descriptor: FormDescriptor;
	formGroup: FormGroup;
	private entity$ = new Subject<Entity>();

	@Input()
	set entity(entity: Entity) {
		// we redo the formGroup each time for change detection.
		// ultimately this should be fixed at angular so maybe check if it
		// has been fixed
		this.formGroup = this.dynamicFormsSrv.toFormGroup(this.descriptor);
		this.formGroup.patchValue(entity);
	}

	constructor(private dynamicFormsSrv: DynamicFormsService,
		private store: Store<any>) {
		super();
	}


	getControl(name: string) {
		return this.formGroup.controls[name];
	}

	onUpdate(event) {
		this.update.emit(event);
	}

}

