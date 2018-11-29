import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, AfterContentChecked } from '@angular/core';
import { Task, User } from '~models';
import { SelectorEntityComponent } from '~shared/selectors/components/selector-entity/selector-entity.component';

@Component({
	selector: 'task-app',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent implements AfterContentChecked {

	@Input() fullUser = false;
	@Input() task: Task;
	@Input() hasSupplier: boolean;
	@Input() hasProduct: boolean;
	@Output() openProduct = new EventEmitter<string>();
	@Output() openSupplier = new EventEmitter<string>();
	@Output() updateTask = new EventEmitter<Task>();
	@Output() previewClicked = new EventEmitter<Task>();

	@ViewChild(SelectorEntityComponent) selector: SelectorEntityComponent;

	menuOpen = false;

	constructor() { }

	ngAfterContentChecked() {
		if (this.selector && this.menuOpen) {
			this.selector.open();
			this.selector.selector.ngSelect.updateDropdownPosition();
		}
	}

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
		this.closeMenu();
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
