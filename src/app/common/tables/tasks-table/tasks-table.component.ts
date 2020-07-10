import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { User } from 'getstream';
import { ListHelper2Service } from '~core/list-page2';
import { Task, TaskStatus, WorkflowStatus } from '~core/erm3';
import { Color } from '~utils/colors.enum';
import { ID } from '~utils/id.utils';
import { defaultConfig } from '../default-columns/default-config';
import { EntityTableComponent, TableConfig } from '../entity-table.component';
import { StatusSelectorService } from '~shared/status-selector/service/status-selector.service';
import _ from 'lodash';

const tableConfig: TableConfig = {
	...defaultConfig,
	dueDate: { name: 'dueDate', translationKey: 'due-date', width: 200, sortProperty: 'dueDate' },
};

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
	static DEFAULT_TABLE_CONFIG = tableConfig;
	@Input() columns = TasksTableComponent.DEFAULT_COLUMNS;
	@Input() tableConfig = TasksTableComponent.DEFAULT_TABLE_CONFIG;
	@Output() openProduct = new EventEmitter<ID>();
	@Output() openSupplier = new EventEmitter<ID>();

	@Input() statuses: WorkflowStatus[];

	constructor(
		public translate: TranslateService,
		public listHelper: ListHelper2Service,
		private statusSrv: StatusSelectorService
	) { super(); }

	getColor(task: Task) {
		if (task.status) {
			switch (task.status.name) {
				case TaskStatus.DONE:
					return Color.SUCCESS;
				case TaskStatus.OVERDUE:
					return Color.WARN;
			}
		}

		return Color.SECONDARY;
	}

	iconClass(task: Task) {
		let iconClass = 'color-txt-third';
		if (task && task.status === TaskStatus.DONE) {
			iconClass = 'task-done';
		} else if (this.isOverdue(task)) {
			iconClass = 'color-warn';
		}
		return iconClass;
	}

	iconName(task: Task) {
		return (task && task.status === TaskStatus.DONE) || this.isOverdue(task) ? 'check-circle' : 'check-circle-light';
	}

	updateDueDateStatus({ entity, dueDate }) {
		const { id, status } = entity;
		let updateStatus = null;

		if (this.isOverdue(dueDate)) {
			updateStatus = this.getStatus(TaskStatus.OVERDUE);
		} else {
			updateStatus = status && status.name === TaskStatus.OVERDUE ? this.getStatus(TaskStatus.PENDING) : this.getStatus(TaskStatus.DONE);
		}

		this.statusSrv.updateStatus(updateStatus, { id }).pipe(first()).subscribe();

		this.listHelper.update({
			id,
			dueDate
		});
	}

	changeAssignee(task: Task, assignee: User) {
		// this.taskSrv.update({ id: task.id, assignee }).subscribe();
	}

	private getStatus(taskStatus) {
		return _.find(this.statuses, (status: any)  => status.name === taskStatus);
	}

	private isOverdue(value: Task | string) {
		if (typeof value === 'object') {
			return value && value.dueDate && (new Date().getTime() >= Date.parse(value.dueDate.toString()));
		} else {
			return new Date().getTime() >= Date.parse(value);
		}
	}
}
