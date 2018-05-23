import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomField, FormDescriptor } from '~shared/dynamic-forms/utils/custom-field.model';
import { DynamicFormsService } from '~shared/dynamic-forms/services/dynamic-forms.service';

@Component({
	selector: 'dynamic-form-app',
	templateUrl: './dynamic-form.component.html',
	styleUrls: ['./dynamic-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit {
	@Input() descriptor: FormDescriptor;
	/** when editable is set to true, then the version of the forms becomes one that is using editable text */
	@Input() editable = false;
	@Output() formCreated = new EventEmitter<FormGroup>();
	form: FormGroup;
	constructor(private dfSrv: DynamicFormsService) {
	}

	ngOnInit() {
		this.form = this.dfSrv.toFormGroup(this.descriptor.fields);
		this.formCreated.emit(this.form);
	}

}
