import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EntityTableComponent, TableConfig } from '~common/tables/entity-table.component';
import { Project } from '~models';
import { Color } from '~utils';
import { defaultConfig } from '../default-columns/default-config';

const tableConfig: TableConfig = {
	...defaultConfig,
	projectLead: { name: 'projectLead', translationKey: 'project-lead', width: 152, sortProperty: 'createdBy.firstName' },
};

@Component({
	selector: 'projects-table-app',
	templateUrl: './projects-table.component.html',
	styleUrls: ['./projects-table.component.scss']
})
export class ProjectsTableComponent extends EntityTableComponent<Project> {
	static DEFAULT_COLUMNS = [ 'logo', 'name', 'projectLead', 'dueDate', 'status', 'createdBy', 'creationDate' ];
	static DEFAULT_TABLE_CONFIG = tableConfig;
	@Input() columns = ProjectsTableComponent.DEFAULT_COLUMNS;
	@Input() tableConfig = ProjectsTableComponent.DEFAULT_TABLE_CONFIG;
	@Input() navigation = true;

	color = Color;

	constructor(public translate: TranslateService) {
		super();
	}
}
