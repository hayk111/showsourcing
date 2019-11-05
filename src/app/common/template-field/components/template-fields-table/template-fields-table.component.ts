import { Component, Output, EventEmitter } from '@angular/core';
import { EntityTableComponent, TableConfig } from '~core/list-page/entity-table.component';
import { ERM, TemplateField, ExtendedFieldDefinition } from '~models';
import { DynamicUpdate } from '~shared/dynamic-forms/models/dynamic-update.interface';
import { InTemplateField } from '~common/modals/services/template-mngmt.service';

const tableConfig: TableConfig = {
	name: { name: 'name', translationKey: 'name', width: 120, sortable: false },
	defaultValue: { name: 'default value', translationKey: 'default value', width: 120, sortable: false },
	fixedValue: { name: 'fixed value', translationKey: 'fixed value', width: 120, sortable: false },
	inTemplate: { name: 'in template', translationKey: 'in template', width: 120, sortable: false },
};

@Component({
	selector: 'template-fields-table-app',
	templateUrl: './template-fields-table.component.html',
	styleUrls: [
		'./template-fields-table.component.scss',
		'../../../../../app/theming/specific/list.scss'
	]
})
export class TemplateFieldsTableComponent extends EntityTableComponent<TemplateField> {
	@Output() addField = new EventEmitter<TemplateField>();
	@Output() removeField = new EventEmitter<TemplateField>();
	columns = ['name', 'defaultValue', 'fixedValue', 'inTemplate'];
	tableConfig = tableConfig;
	erm = ERM;

	constructor() {
		super();
	}

	updateField(field: InTemplateField, event: DynamicUpdate) {
		Object.assign(field, event);
		this.update.emit();
	}

	getCustomField(field: InTemplateField) {
		return { ...field.definition, name: 'defaultValue' };
	}

	toggleInTemplate(field: InTemplateField) {
		field.inTemplate = !field.inTemplate;
	}

	toggleFixedValue(field: InTemplateField) {
		field.fixedValue = !field.fixedValue;
	}
}
