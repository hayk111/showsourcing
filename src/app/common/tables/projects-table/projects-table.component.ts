import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EntityTableComponent, TableConfig } from '~common/tables/entity-table.component';
import { Project } from '~core/erm';
import { defaultConfig } from '../default-columns/default-config';

@Component({
	selector: 'projects-table-app',
	templateUrl: './projects-table.component.html',
	styleUrls: ['./projects-table.component.scss']
})
export class ProjectsTableComponent extends EntityTableComponent<Project> {
	static DEFAULT_COLUMNS = [ 'logo', 'name', 'assignee', 'dueDate', 'status', 'createdBy', 'creationDate' ];
	static DEFAULT_TABLE_CONFIG = defaultConfig;
	@Input() columns = ProjectsTableComponent.DEFAULT_COLUMNS;
	@Input() tableConfig = ProjectsTableComponent.DEFAULT_TABLE_CONFIG;
	@Input() navigation = true;

	constructor(public translate: TranslateService) {
		super();
	}
}
