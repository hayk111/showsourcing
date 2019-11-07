import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EntityTableComponent, TableConfig, TableConfigType } from '~core/list-page';
import { ERM, Task } from '~core/models';
import { ID } from '~utils/id.utils';
import { TaskService } from '~core/entity-services';
import { User } from 'getstream';

const bigTableConfig: TableConfig = {
	done: { name: 'done', translationKey: '', width: 0, sortable: false },
	reference: { name: 'reference', translationKey: 'reference', width: 80, sortProperty: 'reference' },
	name: { name: 'name', translationKey: 'name', width: 120, sortProperty: 'name' },
	product: { name: 'product', translationKey: 'product', width: 160, sortProperty: 'product.name' },
	supplier: { name: 'supplier', translationKey: 'supplier', width: 160, sortProperty: 'supplier.name' },
	dueDate: { name: 'due date', translationKey: 'due-date', width: 110, sortProperty: 'dueDate' },
	assignee: { name: 'assigned to', translationKey: 'assigned-to', width: 160, sortProperty: 'assignee.firstName' },
	status: { name: 'status', translationKey: 'status', width: 85, sortProperty: 'status.step', sortable: false },
	createdBy: { name: 'created by', translationKey: 'created-by', width: 160, sortProperty: 'createdBy.firstName' },
	createdOn: { name: 'created on', translationKey: 'created-on', width: 160, sortProperty: 'creationDate' },
};

const mediumTableConfig: TableConfig = {
	about: { name: 'about', translationKey: 'about', width: 590, sortProperty: 'name' },
	status: { name: 'status', translationKey: 'status', width: 80, sortProperty: 'status.step', sortable: false },
};

const smallTableConfig: TableConfig = {
	done: { name: 'done', translationKey: 'done', width: 50 },
	name: { name: 'name assignee', translationKey: 'name', width: 240, sortProperty: 'name' },
	dueDate: { name: 'due date small', translationKey: 'due-date', width: 80, sortProperty: 'dueDate' },
};

const mediumSmallTableConfig: TableConfig = {
	name: { name: 'small done name', translationKey: 'name', width: 240, sortProperty: 'name' },
	assigneeDueDate: { name: 'assignee due date', translationKey: '', width: 180, sortable: false },
};

@Component({
	selector: 'task-table-app',
	templateUrl: './tasks-table.component.html',
	styleUrls: [
		'./tasks-table.component.scss',
		'../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksTableComponent extends EntityTableComponent<Task> implements OnInit {

	@Input() tableConfigType: TableConfigType = 'big';
	@Output() openProduct = new EventEmitter<ID>();
	@Output() openSupplier = new EventEmitter<ID>();

	columns = ['done', 'reference', 'name', 'product', 'supplier', 'dueDate', 'assignee', 'status', 'createdBy', 'createdOn'];
	erm = ERM;

	constructor(
		public translate: TranslateService,
		private taskSrv: TaskService
	) { super(); }

	ngOnInit() {
		this.tableConfig = this.getTableFromType();
		super.ngOnInit();
	}

	getTableFromType() {
		switch (this.tableConfigType) {
			case 'big':
				return bigTableConfig;
			case 'medium':
				return mediumTableConfig;
			case 'small':
				return smallTableConfig;
			case 'medium-small':
				return mediumSmallTableConfig;
		}
	}

	isOverdue(task: Task) {
		return task && task.dueDate && (new Date().getTime() >= Date.parse(task.dueDate.toString()));
	}

	iconClass(task: Task) {
		let iconClass = 'task-not-done';
		if (task && task.done)
			iconClass = 'task-done';
		else if (this.isOverdue(task))
			iconClass = 'task-overdue';
		return iconClass;
	}

	iconName(task: Task) {
		return (task && task.done) || this.isOverdue(task) ? 'check-circle' : 'check-circle-light';
	}

	toggleStatus(task: Task) {
		this.taskSrv.update({ id: task.id, done: !task.done }).subscribe();
	}

	changeAssignee(task: Task, assignee: User) {
		this.taskSrv.update({ id: task.id, assignee }).subscribe();
	}
}
