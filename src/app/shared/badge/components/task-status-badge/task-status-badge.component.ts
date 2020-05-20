import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '~core/erm3/models';

@Component({
	selector: 'task-status-badge-app',
	templateUrl: './task-status-badge.component.html',
	styleUrls: ['./task-status-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskStatusBadgeComponent implements OnInit {

	@Input() task: Task;
	@Input() size: 's' | 'ms' | 'm' | 'l' = 'm';
	@Output() update = new EventEmitter<{task: Task, done: boolean}>();

	constructor() { }

	ngOnInit() {
		console.log('TaskStatusBadgeComponent -> ngOnInit -> this.task', this.task);
	}

	// this is only done for tasks since we don't have it on the DB
	getTaskStatus() {
		if (this.task.status) {
			return this.task.status.name;
		} else if (this.task.dueDate && (new Date().getTime() >= Date.parse(this.task.dueDate.toString()))) {
			return 'overdue';
		} else {
			return 'new task';
		}
	}

	// this is only done for tasks since we don't have it on the DB
	getType() {
		let taskStatusColor = 'secondary'; // pending
		if (this.task && this.task.status.name === 'done')
			taskStatusColor = 'success'; // done
		else if (this.task && this.task.dueDate && (new Date().getTime() >= Date.parse(this.task.dueDate.toString())))
			taskStatusColor = 'warn'; // overdue
		return taskStatusColor;
	}

}
