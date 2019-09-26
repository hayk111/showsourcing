import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityTableComponent, TableConfig } from '~core/list-page';
import { TranslateService } from '@ngx-translate/core';
import { ERM, Task } from '~core/models';
import { ID } from '~utils/id.utils';

const tableConfig: TableConfig = {
	done: { name: 'done', translationKey: '', width: 0, sortable: false },
	reference: { name: 'reference', translationKey: 'reference', width: 80, sortProperty: 'reference' },
	name: { name: 'name', translationKey: 'name', width: 120, sortProperty: 'name' },
	product: { name: 'product', translationKey: 'product', width: 160, sortProperty: 'product.name' },
	supplier: { name: 'supplier', translationKey: 'supplier', width: 150, sortProperty: 'supplier.name' },
	dueDate: { name: 'due date', translationKey: 'due-date', width: 103, sortProperty: 'dueDate' },
	assignee: { name: 'assigned to', translationKey: 'assigned-to', width: 140, sortProperty: 'assignee.firstName' },
	status: { name: 'status', translationKey: 'status', width: 85, sortProperty: 'status.step', sortable: false },
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
