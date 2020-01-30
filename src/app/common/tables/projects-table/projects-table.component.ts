import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EntityTableComponent, TableConfig } from '~common/tables/entity-table.component';
import { Project } from '~core/erm/models';
import { defaultConfig } from '../default-columns/default-config';

const tableConfig: TableConfig = {
	...defaultConfig,
	assignee: { name: 'assignee', translationKey: 'project-lead', width: 152, sortProperty: 'assignee.firstName' },
};

@Component({
	selector: 'projects-table-app',
	templateUrl: './projects-table.component.html',
	styleUrls: ['./projects-table.component.scss']
})
export class ProjectsTableComponent extends EntityTableComponent<Project> {
	static DEFAULT_COLUMNS = [ 'logo', 'name', 'assignee', 'dueDate', 'status', 'createdBy', 'creationDate' ];
	static DEFAULT_TABLE_CONFIG = tableConfig;
	@Input() columns = ProjectsTableComponent.DEFAULT_COLUMNS;
	@Input() tableConfig = ProjectsTableComponent.DEFAULT_TABLE_CONFIG;
	@Input() navigation = true;

	constructor(public translate: TranslateService) {
		super();
	}
}
