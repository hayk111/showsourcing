import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';
import { ListViewComponent, TableConfig } from '~core/list-page';
import { Task, ERM } from '~core/models';
import { ID } from '~utils/id.utils';

const tableConfig: TableConfig = {
	taskDone: { title: '', width: 0, sortable: false },
	reference: { title: 'reference', width: 80, sortProperty: 'reference' },
	name: { title: 'name', width: 120, sortProperty: 'name' },
	product: { title: 'product', width: 160, sortProperty: 'product.name' },
	supplier: { title: 'supplier', width: 150, sortProperty: 'supplier.name' },
	dueDate: { title: 'due date', width: 103, sortProperty: 'dueDate' },
	assignee: { title: 'assigned to', width: 140, sortProperty: 'assignee.firstName' },
	status: { title: 'status', width: 85, sortProperty: 'status.step', sortable: false },
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

	columns = [ 'taskDone', 'reference', 'name', 'product', 'supplier', 'dueDate', 'assignee', 'status' ];
	tableConfig = tableConfig;
	erm = ERM;

	@Output() openProduct = new EventEmitter<ID>();
	@Output() openSupplier = new EventEmitter<ID>();

	constructor() { super(); }

}
