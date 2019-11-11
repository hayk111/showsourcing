import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Task } from '~core/models';

@Component({
	selector: 'task-list-app',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {

	@Input() tasks: Array<Task>;
	
	constructor() {}
	
	trackByFn(task: Task) {
		return task.id;
	}
}
