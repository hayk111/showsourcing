import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Descriptor, FieldDescriptor } from '~core/erm3/models';
import { Section } from '~core/erm3/models/section.model';
import { SectionWithColumns } from '~shared/descriptor/interfaces/section-with-columns.interface';
import { log } from '~utils/log';


export interface Property {
	name: string;
	value: any;
}

@Component({
	selector: 'dynamic-form2-app',
	templateUrl: './dynamic-form.component.html',
	styleUrls: ['./dynamic-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit, OnChanges {
	@Input() descriptor: Descriptor;
	@Input() style: 'form' | 'editable' = 'form';
	@Input() columnAmount = 1;
	@Input() updateOn: 'blur' | 'input' = 'blur';
	@Input() properties: Property[];
	@Output() update = new EventEmitter<Property[]>();
	sections: SectionWithColumns[];
	propertyMap = new Map<string, Property>();

	ngOnInit() {
		if (!this.descriptor) {
			throw Error('component must initialized with a descriptor');
		}
	}

	ngOnChanges(changes: SimpleChanges ) {
		const colChanges = changes.columnAmount;
		if (colChanges && colChanges.previousValue !== colChanges.currentValue) {
			this.sections = this.descriptor.sections
				.map(section => this.makeColumns(section));
		}
		const propChanges = changes.properties;
		if (propChanges && propChanges.previousValue !== propChanges.currentValue) {
			this.propertyMap = this.properties
				.reduce((a, b) => a.set(b.name, b), new Map());
		}
	}


	onInput(field: FieldDescriptor, value: any) {
		if (this.updateOn === 'input')
			this.doUpdate(field, value);
	}

	onBlur(field: FieldDescriptor, value: any) {
		if (this.updateOn === 'blur')
			this.doUpdate(field, value);
	}

	private doUpdate(field: FieldDescriptor, value: any) {
		const name = field.definition.name;
		const previousIndex = this.properties.findIndex(prop => prop.name === name);
		const properties = [...this.properties];
		if (previousIndex >= 0)
			properties[previousIndex] = { name, value };
		else
			properties.push({ name, value });
		console.log(properties);
		this.update.emit(properties);
	}

	/** put the custom fields into columns
	 * If we have only one column then we will have one column with all the fields
	 * If we have two columns we will have 2 columns with each half the field, etc..
	 */
	private makeColumns(section: Section) {
		log.debug('making columns');
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
