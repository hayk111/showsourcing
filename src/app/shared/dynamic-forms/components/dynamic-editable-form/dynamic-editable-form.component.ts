import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CustomField, FormDescriptor } from '~shared/dynamic-forms/models';
import { DynamicFormsService } from '~shared/dynamic-forms/services/dynamic-forms.service';

@Component({
	selector: 'dynamic-editable-form-app',
	templateUrl: './dynamic-editable-form.component.html',
	styleUrls: ['./dynamic-editable-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicEditableFormComponent implements OnInit {
	@Input() descriptor: FormDescriptor;
	/** number of columns */
	@Input() colAmount = 1;
	/** max number of elements in column */
	@Input() elementsPerColAmount;
	/** when editable is set to true, then the version of the forms becomes one that is using editable text */
	@Input() editable = false;
	/** some forms have inline labels which is very annoying but w.e */
	@Input() inlineLabel: boolean;
	@Output() formCreated = new EventEmitter<FormGroup>();
	form: FormGroup;
	cols: CustomField[][];

	constructor(private dfSrv: DynamicFormsService) {
	}

	ngOnInit() {
		this.makeCols();
		this.form = this.dfSrv.toFormGroup(this.descriptor.fields);
		this.formCreated.emit(this.form);
	}

	/** put the custom fields into columns
	 * If we have only one column then we will have one column with all the fields
	 * If we have two columns we will have 2 columns with each half the field, etc..
	 * If an elementsPerColAmount is specified, use it to fill the columns
	 */
	makeCols() {
		this.cols = [];
		const fields = this.descriptor.fields;
		if (this.elementsPerColAmount) { // We want to control here the number items per column
			let remainingElements = fields.length;
			for (let i = 0; i < this.colAmount; i++) {
				if (remainingElements >= this.elementsPerColAmount) {
					const start = i * this.elementsPerColAmount;
					const end = i * this.elementsPerColAmount + this.elementsPerColAmount;
					this.cols[i] = fields.slice(start, end);
					remainingElements -= this.elementsPerColAmount;
				} else if (remainingElements > 0) {
					const start = i * this.elementsPerColAmount;
					const end = i * this.elementsPerColAmount + remainingElements;
					this.cols[i] = fields.slice(start, end);
				} else {
					this.cols[i] = [];
				}
			}
		} else { // Split elements into the number of columns
			const fieldPerCol = Math.ceil(fields.length / this.colAmount);
			for (let i = 0; i < this.colAmount; i++) {
				const start = i * fieldPerCol;
				const end = i * fieldPerCol + fieldPerCol;
				this.cols[i] = fields.slice(start, end);
			}
		}
	}


}
