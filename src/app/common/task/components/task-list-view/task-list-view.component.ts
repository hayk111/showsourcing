import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EntityTableComponent, TableConfig } from '~core/list-page';
import { Task, ERM } from '~core/models';

const tableConfig: TableConfig = {
	reference: { title: 'reference', width: 80, sortProperty: 'name' },
	assignee: { title: 'assignee', width: 80, sortProperty: 'assignee.firstName' },
	status: { title: 'status', width: 80, sortProperty: 'status.step', sortable: false },
	creationDate: { title: 'created on', width: 80, sortProperty: 'creationDate' },
};

@Component({
	selector: 'task-list-view-app',
	templateUrl: './task-list-view.component.html',
	styleUrls: [
		'./task-list-view.component.scss',
		'../../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListViewComponent extends EntityTableComponent<Task> {

	columns = [ 'reference', 'assignee', 'status', 'creationDate' ];
	tableConfig = tableConfig;
	erm = ERM;

	constructor() { super(); }

}
