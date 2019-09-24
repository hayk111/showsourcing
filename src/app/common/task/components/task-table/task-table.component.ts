import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityTableComponent, TableConfig } from '~core/list-page';
import { TranslateService } from '@ngx-translate/core';
import { ERM, Task } from '~core/models';
import { ID } from '~utils/id.utils';

const tableConfig: TableConfig = {
	done: { title: '', width: 0, sortable: false },
	reference: { title: 'reference', width: 80, sortProperty: 'reference' },
	name: { title: 'name', width: 120, sortProperty: 'name' },
	product: { title: 'product', width: 160, sortProperty: 'product.name' },
	supplier: { title: 'supplier', width: 150, sortProperty: 'supplier.name' },
	dueDate: { title: 'due date', width: 103, sortProperty: 'dueDate' },
	assignee: { title: 'assigned to', width: 140, sortProperty: 'assignee.firstName' },
	status: { title: 'status', width: 85, sortProperty: 'status.step', sortable: false },
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

	@Input() tableConfig = tableConfig;
	@Output() openProduct = new EventEmitter<ID>();
	@Output() openSupplier = new EventEmitter<ID>();

	columns = ['done', 'reference', 'name', 'product', 'supplier', 'dueDate', 'assignee', 'status'];
	erm = ERM;

	constructor(public translate: TranslateService) { super(); }

}
