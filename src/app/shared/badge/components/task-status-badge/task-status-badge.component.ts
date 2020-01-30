import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '~core/erm';
import { TaskStatus } from '~utils';

@Component({
	selector: 'task-status-badge-app',
	templateUrl: './task-status-badge.component.html',
	styleUrls: ['./task-status-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskStatusBadgeComponent implements OnInit {

	@Input() task: Task;
	@Input() size: 's' | 'ms' | 'm' | 'l' = 'm';
	@Output() update = new EventEmitter<boolean>();

	constructor() { }

	ngOnInit() { }

	// this is only done for tasks since we don't have it on the DB
	getTaskStatus() {
		let taskStatus = TaskStatus.PENDING;
		if (this.task && this.task.done)
			taskStatus = TaskStatus.DONE;
		else if (this.task && this.task.dueDate && (new Date().getTime() >= Date.parse(this.task.dueDate.toString())))
			taskStatus = TaskStatus.OVERDUE;
		return taskStatus;
	}

	// this is only done for tasks since we don't have it on the DB
	getType() {
		let taskStatusColor = 'secondary'; // pending
		if (this.task && this.task.done)
			taskStatusColor = 'success'; // done
		else if (this.task && this.task.dueDate && (new Date().getTime() >= Date.parse(this.task.dueDate.toString())))
			taskStatusColor = 'warn'; // overdue
		return taskStatusColor;
	}

}
