import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Descriptor, FieldDescriptor } from '~core/erm3/models';
import { Section } from '~core/erm3/models/section.model';
import { SectionWithColumns } from '~shared/descriptor/interfaces/section-with-columns.interface';


@Component({
	selector: 'dynamic-form-app',
	templateUrl: './dynamic-form.component.html',
	styleUrls: ['./dynamic-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit {
	@Input() descriptor: Descriptor;
	@Input() values: any[];
	@Input() style: 'form' | 'editable' = 'form';
	@Input() columnAmount = 1;
	// not needed if FormValueAccessor is used
	@Input() updateOn: 'blur' | 'input' = 'blur';
	@Output() update = new EventEmitter<any>();
	sections: SectionWithColumns[];
	fieldValueMap = new Map<any, any>();

	ngOnInit() {
		if (!this.descriptor) {
			throw Error('component must initialized with a descriptor');
		}
		this.sections = this.descriptor.sections
			.map(section => this.addColumns(section));
		// do the mapping when we have model
	}


	/** put the custom fields into columns
	 * If we have only one column then we will have one column with all the fields
	 * If we have two columns we will have 2 columns with each half the field, etc..
	 */
	private addColumns(section: Section) {
		const fields = section.fields;
		const fieldPerCol = Math.ceil(fields.length / this.columnAmount);
		const columns: FieldDescriptor[][] = [];
		for (let i = 0; i < this.columnAmount; i++) {
			const start = i * fieldPerCol;
			const end = i * fieldPerCol + fieldPerCol;
			columns[i] = fields.slice(start, end);
		}
		return { ...section, columns };
	}

}
