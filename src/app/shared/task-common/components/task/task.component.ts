import {
	AfterViewChecked,
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { Task, User } from '~models';
import { SelectorEntityComponent } from '~shared/selectors/components/selector-entity/selector-entity.component';
import { DEFAULT_IMG } from '~utils';

@Component({
	selector: 'task-app',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent implements OnInit, AfterViewChecked {

	@Input() fullUser = false;
	@Input() task: Task;
	@Input() hasSupplier: boolean;
	@Input() hasProduct: boolean;
	@Output() openProduct = new EventEmitter<string>();
	@Output() openSupplier = new EventEmitter<string>();
	@Output() updateTask = new EventEmitter<Task>();
	@Output() previewClicked = new EventEmitter<Task>();
	@ViewChild(SelectorEntityComponent) selector: SelectorEntityComponent;

	defaultImg = DEFAULT_IMG;
	selectorVisible = false;

	constructor() { }

	ngOnInit() { }

	ngAfterViewChecked() {
		if (this.selectorVisible)
			this.selector.selector.ngSelect.open();
	}

	get getStatus() {
		let status = 'pending';
		if (this.task.done)
			status = 'done';
		else if (this.task.dueDate && (new Date().getTime() >= Date.parse(this.task.dueDate.toString())))
			status = 'overdue';
		return status;
	}

	toggleSelector(is: boolean) {
		if (this.selector) { // when we select an option on the selector, so the selector gets closed
			this.selectorVisible = false;
		} else this.selectorVisible = is;
	}

	updateAssignee(user: User) {
		this.updateTask.emit({ ...this.task, assignee: user });
	}

	toggleDoneStatus() {
		const done = !this.task.done;
		this.updateTask.emit({ ...this.task, done });
	}
}