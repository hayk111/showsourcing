import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EntityTableComponent, TableConfig } from '~common/tables/entity-table.component';
import { Project } from '~models';
import { Color } from '~utils';
import { defaultConfig } from '../default-columns/default-config';

const tableConfig: TableConfig = {
	...defaultConfig,
};

@Component({
	selector: 'projects-table-app',
	templateUrl: './projects-table.component.html',
	styleUrls: [
		'./projects-table.component.scss',
	]
})
export class ProjectsTableComponent extends EntityTableComponent<Project> {
	@Input() navigation = true;

	columns = ['logo', 'name', 'reference', 'productCount', 'status', 'dueDate', 'createdBy', 'creationDate'];
	tableConfig = tableConfig;
	color = Color;

	constructor(public translate: TranslateService) {
		super();
	}
}
