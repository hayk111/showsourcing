import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '~core/models';

@Component({
	selector: 'task-status-badge-app',
	templateUrl: './task-status-badge.component.html',
	styleUrls: ['./task-status-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskStatusBadgeComponent implements OnInit {

	@Input() task: Task;
	@Output() update = new EventEmitter<boolean>();

	constructor() { }

	ngOnInit() {
	}

	// this is only done for tasks since we don't have it on the DB
	getTaskStatus() {
		let taskStatus = 'pending';
		if (this.task && this.task.done)
			taskStatus = 'done';
		else if (this.task && this.task.dueDate && (new Date().getTime() >= Date.parse(this.task.dueDate.toString())))
			taskStatus = 'overdue';
		return taskStatus;
	}

	// this is only done for tasks since we don't have it on the DB
	getTaskColor() {
		let taskStatusColor = 'secondary'; // pending
		if (this.task && this.task.done)
			taskStatusColor = 'success'; // done
		else if (this.task && this.task.dueDate && (new Date().getTime() >= Date.parse(this.task.dueDate.toString())))
			taskStatusColor = 'warn'; // overdue
		return taskStatusColor;
	}

}
