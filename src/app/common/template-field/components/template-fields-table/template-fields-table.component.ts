import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EntityTableComponent, TableConfig } from '~core/list-page/entity-table.component';
import { ERM, TemplateField } from '~models';

const tableConfig: TableConfig = {
	name: { name: 'name', translationKey: 'name', width: 120, sortable: false },
	defaultValue: { name: 'default value', translationKey: 'default-value', width: 120, sortable: false },
	fixedValue: { name: 'fixed value', translationKey: 'fixed-value', width: 120, sortable: false },
	inTemplate: { name: 'in template', translationKey: 'in-template', width: 120, sortable: false },
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

	columns = ['name', 'defaultValue', 'fixedValue', 'inTemplate'];
	tableConfig = tableConfig;
	erm = ERM;

	constructor(public translate: TranslateService) {
		super();
	}
}
