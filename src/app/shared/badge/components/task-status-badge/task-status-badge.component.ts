import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '~core/erm3/models';
import { TaskStatus } from '~core/erm3/enums';
import * as _ from 'lodash';

@Component({
	selector: 'task-status-badge-app',
	templateUrl: './task-status-badge.component.html',
	styleUrls: ['./task-status-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskStatusBadgeComponent {

	@Input() task: Task;
	@Input() statuses: any[];
	@Input() size: 's' | 'ms' | 'm' | 'l' = 'm';
	@Output() update = new EventEmitter<TaskStatus>();

	constructor() { }

	// this is only done for tasks since we don't have it on the DB
	getTaskStatus() {
		if (this.task.status) {
			return this.task.status.name;
		} else if (this.task.dueDate && (new Date().getTime() >= Date.parse(this.task.dueDate.toString()))) {
			return TaskStatus.OVERDUE;
		} else {
			return TaskStatus.PENDING;
		}
	}

	// this is only done for tasks since we don't have it on the DB
	getType() {
		if (this.task.status) { // this check is done for now as the BE doesn't correctly set the default task status yet
			switch (this.task.status.name) {
				case TaskStatus.DONE:
					return 'success';
				case TaskStatus.OVERDUE:
					return 'warn';
			}
		}

		return 'secondary';
	}

	toggleTaskStatus() {
		// if status is OVERDUE we toggle it to DONE
		if (this.task.status && this.task.status.name === TaskStatus.OVERDUE) {
			this.update.emit(this.getStatus(TaskStatus.DONE));
			return;
		}

		if (this.isOverdue(this.task)) {
			this.update.emit(this.getStatus(TaskStatus.OVERDUE));
			return;
		}

		if (!this.task.status) { // temporary condition for empty statuses
			this.update.emit(this.getStatus(TaskStatus.DONE));
			return;
		}

		this.update.emit(
			this.task.status.name ===  TaskStatus.PENDING ? this.getStatus(TaskStatus.DONE) : this.getStatus(TaskStatus.PENDING)
		);
	}

	private getStatus(taskStatus) {
		return _.find(this.statuses, (status: any)  => status.name === taskStatus);
	}

	private isOverdue(task: Task) {
		return task && task.dueDate && (new Date().getTime() >= Date.parse(task.dueDate.toString()));
	}
}
