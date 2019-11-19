import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EntityTableComponent, TableConfig } from '~core/list-page/entity-table.component';
import { ERM, Project } from '~models';
import { Color } from '~utils';

const tableConfig: TableConfig = {
	name: { name: 'name', translationKey: 'name', width: 240, sortProperty: 'name' },
	owner: { name: 'project lead', translationKey: 'project-lead', width: 184, sortProperty: 'createdBy.firstName' },
	// TODO Backend duedate
	// dueDate: { name: 'due date', translationKey: 'due-date', width: 140, sortProperty: 'dueDate' },
	status: { name: 'status', translationKey: 'status', width: 100, sortable: false },
	createdBy: { name: 'created by', translationKey: 'created-by', width: 140, sortProperty: 'createdBy.firstName' },
	creationDate: { name: 'created on', translationKey: 'created-on', width: 140, sortProperty: 'creationDate' },
};

@Component({
	selector: 'projects-table-app',
	templateUrl: './projects-table.component.html',
	styleUrls: [
		'./projects-table.component.scss',
		'../../../../app/theming/specific/list.scss'
	]
})
export class ProjectsTableComponent extends EntityTableComponent<Project> {

	@Input() navigation = true;

	@Output() showItemsPerPage = new EventEmitter<number>();

	// TODO Backend duedate
	// columns = ['name', 'owner', 'dueDate', 'status', 'createdBy', 'creationDate'];
	columns = ['name', 'owner', 'status', 'createdBy', 'creationDate'];
	tableConfig = tableConfig;
	erm = ERM;
	color = Color;

	constructor(public translate: TranslateService) {
		super();
	}
}
