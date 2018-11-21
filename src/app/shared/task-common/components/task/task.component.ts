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

	menuOpen = false;

	constructor() { }

	get getStatus() {
		let status = 'pending';
		if (this.task.done)
			status = 'done';
		else if (this.task.dueDate && (new Date().getTime() >= Date.parse(this.task.dueDate.toString())))
			status = 'overdue';
		return status;
	}

	updateAssignee(user: User) {
		this.updateTask.emit({ ...this.task, assignee: user });
	}

	toggleDoneStatus() {
		const done = !this.task.done;
		this.updateTask.emit({ ...this.task, done });
	}

	toggleMenu() {
		this.menuOpen = !this.menuOpen;
	}

	closeMenu() {
		this.menuOpen = false;
	}
}
