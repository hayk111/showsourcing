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
	selector: 'task-table-app',
	templateUrl: './task-table.component.html',
	styleUrls: [
		'./task-table.component.scss',
		'../../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskTableComponent extends EntityTableComponent<Task> {

	columns = [ 'reference', 'assignee', 'status', 'creationDate' ];
	tableConfig = tableConfig;
	erm = ERM;

	constructor() { super(); }

}
