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

	@Input() tasks: Task[];
	@Output() taskClicked = new EventEmitter<Task>();

	displayIndex = 3;

	constructor() {
		super();
	}

}
