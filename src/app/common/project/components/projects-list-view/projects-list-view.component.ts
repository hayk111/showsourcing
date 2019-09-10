import { Component, EventEmitter, Output } from '@angular/core';
import { ListViewComponent, TableConfig } from '~core/list-page/list-view.component';
import { Project, ERM } from '~models';
import { Color } from '~utils';

const tableConfig: TableConfig = {
	name: { title: 'name', width: 240, sortProperty: 'name' },
	owner: { title: 'project lead', width: 184, sortProperty: 'createdBy.firstName' },
	dueDate: { title: 'due date', width: 140, sortable: false }, // should be sortable, made false because dueDate property doesn't exist now
	status: { title: 'status', width: 100, sortProperty: 'status.step' },
	createdBy: { title: 'created by', width: 140, sortProperty: 'creationDate' },
	creationDate: { title: 'created on', width: 140, sortProperty: 'creationDate' },
};


@Component({
	selector: 'projects-list-view-app',
	templateUrl: './projects-list-view.component.html',
	styleUrls: [
		'./projects-list-view.component.scss',
		'../../../../../app/theming/specific/list.scss'
	]
})
export class ProjectsListViewComponent extends ListViewComponent<Project> {

	@Output() showItemsPerPage = new EventEmitter<number>();

	columns = [
		'name', 'owner', 'dueDate', 'status', 'createdBy', 'creationDate'
	];
	tableConfig = tableConfig;
	erm = ERM;
	color = Color;
}
