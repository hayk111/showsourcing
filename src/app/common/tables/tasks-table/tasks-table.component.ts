import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EntityTableComponent, TableConfig, TableConfigType } from '~core/list-page';
import { Task } from '~core/models';
import { ID } from '~utils/id.utils';
import { TaskService } from '~core/entity-services';
import { User } from 'getstream';
import { mediumSmallTableConfig, smallTableConfig, mediumTableConfig, bigTableConfig } from './config';
import { Color } from '~utils/colors.enum';


@Component({
	selector: 'task-table-app',
	templateUrl: './tasks-table.component.html',
	styleUrls: [
		'./tasks-table.component.scss',
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksTableComponent extends EntityTableComponent<Task> implements OnInit {

	@Input() tableConfigType: TableConfigType = 'big';
	@Output() openProduct = new EventEmitter<ID>();
	@Output() openSupplier = new EventEmitter<ID>();
	columns = [
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

	constructor(
		public translate: TranslateService,
		public taskSrv: TaskService
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
