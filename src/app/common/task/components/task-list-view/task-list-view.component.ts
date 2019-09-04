import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListViewComponent, TableConfig } from '~core/list-page';
import { Task, ERM } from '~core/models';

// TODO hayk config this
const tableConfig: TableConfig = {
	reference: { title: 'reference', width: 190, sortProperty: 'name' },
	assignee: { title: 'assignee', width: 190, sortProperty: 'assignee.firstName' },
	status: { title: 'status', width: 190, sortProperty: 'status.step', sortable: false },
	creationDate: { title: 'created on', width: 190, sortProperty: 'creationDate' },
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
export class TaskListViewComponent extends ListViewComponent<Task> {

	columns = [ 'reference', 'assignee', 'status', 'creationDate' ]; // TODO hayk add default columns here
	tableConfig = tableConfig;
	erm = ERM;

	constructor() { super(); }

}
