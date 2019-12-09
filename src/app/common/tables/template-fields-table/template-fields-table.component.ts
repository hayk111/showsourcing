import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityTableComponent, TableConfig } from '~core/list-page';
import { ERM, TemplateField } from '~models';
import { DynamicFormConfig } from '~shared/dynamic-forms/models/dynamic-form-config.interface';
import { DynamicUpdate } from '~shared/dynamic-forms/models/dynamic-update.interface';

const tableConfig: TableConfig = {
	name: { name: 'name', translationKey: 'name', width: 120, sortable: false },
	defaultValue: { name: 'default value', translationKey: 'default value', width: 120, sortable: false },
	fixedValue: { name: 'fixed value', translationKey: 'fixed value', width: 120, sortable: false },
	inTemplate: { name: 'in template', translationKey: 'in template', width: 120, sortable: false },
};

@Component({
	selector: 'template-fields-table-app',
	templateUrl: './template-fields-table.component.html',
	styleUrls: ['./template-fields-table.component.scss']
})
export class TemplateFieldsTableComponent extends EntityTableComponent<TemplateField> {

	@Input() inTemplate = new Map<string, boolean>();
	@Input() config =
		new DynamicFormConfig({ objectAsString: true, borderless: true, hasAction: false, hasLabel: false, showComplexTypes: false });
	@Output() addField = new EventEmitter<TemplateField>();
	@Output() removeField = new EventEmitter<TemplateField>();
	columns = ['name', 'defaultValue', 'fixedValue', 'inTemplate'];
	tableConfig = tableConfig;
	erm = ERM;

	constructor() {
		super();
	}

	updateField(field: TemplateField, event: DynamicUpdate) {
		Object.assign(field, event);
		this.update.emit();
	}

	getCustomField(field: TemplateField) {
		return { ...field.definition, name: 'defaultValue' };
	}

	toggleInTemplate(field: TemplateField, value) {
		this.inTemplate.set(field.id, value);
	}

	toggleFixedValue(field: TemplateField) {
		field.fixedValue = !field.fixedValue;
	}
}
