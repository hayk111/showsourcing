import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { productsJson } from '../mock-data';
import { SelectionService } from '~core/list-page';
import { Task } from '~core/models';

@Component({
	selector: 'task-list-app',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {

	@Input() set tasks(tasks: Array<Task>) {
		this._tasks = tasks;
	}

	get tasks() {
		return this._tasks;
	}

	private _tasks: Array<Task>;

	constructor() {}

	trackByFn(task: Task) {
		return task.id;
	}
}
