import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '~core/models';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'task-list-app',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent extends TrackingComponent {

	private _tasks: Task[];
	@Input() set tasks(tasks: Task[]) {
		this._tasks = (tasks || []).sort((a, b) => ((a.done === b.done) ? 0 : (a.done ? 1 : -1)));
	}
	get tasks() {
		return this._tasks;
	}
	@Output() taskClicked = new EventEmitter<Task>();

	displayIndex = 3;

	constructor() {
		super();
	}

}
