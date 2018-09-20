import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomField, FormDescriptor } from '~shared/dynamic-forms/models';
import { DynamicFormsService } from '~shared/dynamic-forms/services/dynamic-forms.service';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';
import { DynamicUpdate } from '~shared/dynamic-forms/models/dynamic-update.interface';

@Component({
	selector: 'dynamic-form-app',
	templateUrl: './dynamic-form.component.html',
	styleUrls: ['./dynamic-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent extends TrackingComponent implements OnInit {
	@Input() descriptor: FormDescriptor;
	/** number of columns */
	@Input() colAmount = 1;
	/** when is open we see form inputs directly */
	@Input() textMode = true;
	/** some forms have inline labels which is very annoying but w.e */
	@Input() inlineLabel: boolean;
	@Input() isShowLabel = true;
	@Output() formCreated = new EventEmitter<FormGroup>();
	@Output() update = new EventEmitter<DynamicUpdate>();
	form: FormGroup;
	cols: CustomField[][];

	constructor(private dfSrv: DynamicFormsService) {
		super();
	}

	ngOnInit() {
		this.makeCols();
		this.form = this.dfSrv.toFormGroup(this.descriptor.fields);
		this.formCreated.emit(this.form);
	}

	/** put the custom fields into columns
	 * If we have only one column then we will have one column with all the fields
	 * If we have two columns we will have 2 columns with each half the field, etc..
	 */
	makeCols() {
		this.cols = [];
		const fields = this.descriptor.fields;
		const fieldPerCol = Math.ceil(fields.length / this.colAmount);
		for (let i = 0; i < this.colAmount; i++) {
			const start = i * fieldPerCol;
			const end = i * fieldPerCol + fieldPerCol;
			this.cols[i] = fields.slice(start, end);
		}
	}


}
