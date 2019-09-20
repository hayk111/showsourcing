import { Component, EventEmitter, Output } from '@angular/core';
import { EntityTableComponent, TableConfig } from '~core/list-page/entity-table.component';
import { Project, ERM } from '~models';
import { Color } from '~utils';

const tableConfig: TableConfig = {
	name: { title: 'name', width: 240, sortProperty: 'name' },
	owner: { title: 'project lead', width: 184, sortProperty: 'createdBy.firstName' },
	// TODO Backend duedate
	// dueDate: { title: 'due date', width: 140, sortProperty: 'dueDate' },
	dueDate: { title: 'due date', width: 140, sortable: false },
	status: { title: 'status', width: 100, sortProperty: 'status.step' },
	createdBy: { title: 'created by', width: 140, sortProperty: 'creationDate' },
	creationDate: { title: 'created on', width: 140, sortProperty: 'creationDate' },
};

@Component({
	selector: 'projects-table-app',
	templateUrl: './projects-table.component.html',
	styleUrls: [
		'./projects-table.component.scss',
		'../../../../../app/theming/specific/list.scss'
	]
})
export class ProjectsTableComponent extends EntityTableComponent<Project> {

	@Output() showItemsPerPage = new EventEmitter<number>();

	columns = [
		'name', 'owner', 'dueDate', 'status', 'createdBy', 'creationDate'
	];
	tableConfig = tableConfig;
	erm = ERM;
	color = Color;
}
