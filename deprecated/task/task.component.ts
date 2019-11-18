import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, User } from '~models';

@Component({
	selector: 'task-app',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {

	@Input() fullUser = false;
	@Input() task: Task;
	@Input() hasSupplier: boolean;
	@Input() hasProduct: boolean;
	@Output() openProduct = new EventEmitter<string>();
	@Output() openSupplier = new EventEmitter<string>();
	@Output() updateTask = new EventEmitter<Task>();
	@Output() previewClicked = new EventEmitter<Task>();

	constructor() { }

	updateAssignee(user: User) {
		this.updateTask.emit({ ...this.task, assignee: user });
	}

	updateStatus(done: boolean) {
		this.updateTask.emit({ ...this.task, done });
	}
}
