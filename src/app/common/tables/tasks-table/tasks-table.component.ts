import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'getstream';
import { TaskService } from '~core/entity-services';
import { Task } from '~core/models';
import { Color } from '~utils/colors.enum';
import { ID } from '~utils/id.utils';
import { defaultConfig } from '../default-columns/default-config';
import { EntityTableComponent } from '../entity-table.component';


@Component({
	selector: 'task-table-app',
	templateUrl: './tasks-table.component.html',
	styleUrls: [
		'./tasks-table.component.scss',
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksTableComponent extends EntityTableComponent<Task> implements OnInit {
	static DEFAULT_COLUMNS = [
		'logo',
		'name',
		'reference',
		'product',
		'supplier',
		'dueDate',
		'assignee',
		'status',
		'createdBy',
		'creationDate'
	];
	static DEFAULT_TABLE_CONFIG = defaultConfig;
	@Input() columns = TasksTableComponent.DEFAULT_COLUMNS;
	@Input() tableConfig = TasksTableComponent.DEFAULT_TABLE_CONFIG;
	@Output() openProduct = new EventEmitter<ID>();
	@Output() openSupplier = new EventEmitter<ID>();


	constructor(
		public translate: TranslateService,
		public taskSrv: TaskService
	) { super(); }

	getColor(task: Task) {
		if (task.done)
			return Color.SUCCESS;
		else if (this.isOverdue(task))
			return Color.WARN;
		else
			return Color.SECONDARY;
	}

	isOverdue(task: Task) {
		return task && task.dueDate && (new Date().getTime() >= Date.parse(task.dueDate.toString()));
	}

	iconClass(task: Task) {
		let iconClass = 'color-txt-third';
		if (task && task.done)
			iconClass = 'task-done';
		else if (this.isOverdue(task))
			iconClass = 'color-warn';
		return iconClass;
	}

	iconName(task: Task) {
		return (task && task.done) || this.isOverdue(task) ? 'check-circle' : 'check-circle-light';
	}

	toggleStatus(task: Task) {
		this.taskSrv.updateTask({ id: task.id, done: !task.done });
	}

	changeAssignee(task: Task, assignee: User) {
		this.taskSrv.update({ id: task.id, assignee }).subscribe();
	}
}
