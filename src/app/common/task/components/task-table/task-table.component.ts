import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityTableComponent, TableConfig } from '~core/list-page';
import { TranslateService } from '@ngx-translate/core';
import { ERM, Task } from '~core/models';
import { ID } from '~utils/id.utils';

const tableConfig: TableConfig = {
	taskDone: { title: '', translationKey: 'null', width: 0, sortable: false },
	about: { title: 'about', translationKey: 'about', width: 140, sortable: true },
	reference: { title: 'reference', translationKey: 'reference', width: 80, sortProperty: 'reference' },
	name: { title: 'name', translationKey: 'name', width: 120, sortProperty: 'name' },
	product: { title: 'product', translationKey: 'product', width: 160, sortProperty: 'product.name' },
	supplier: { title: 'supplier', translationKey: 'supplier', width: 150, sortProperty: 'supplier.name' },
	dueDate: { title: 'due date', translationKey: 'due-date', width: 103, sortProperty: 'dueDate' },
	assignee: { title: 'assigned to', translationKey: 'assigned-to', width: 140, sortProperty: 'assignee.firstName' },
	status: { title: 'status', translationKey: 'status', width: 85, sortProperty: 'status.step', sortable: false },
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

	columns = ['taskDone', 'reference', 'name', 'product', 'supplier', 'dueDate', 'assignee', 'status'];
	erm = ERM;

	constructor(public translate: TranslateService) { super(); }

}
