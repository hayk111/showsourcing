import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '~core/models';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'task-catalog-app',
	templateUrl: './task-catalog.component.html',
	styleUrls: ['./task-catalog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCatalogComponent extends TrackingComponent {

	@Input() tasks: Task[];
	@Output() taskClicked = new EventEmitter<Task>();

	displayIndex = 3;

	constructor() {
		super();
	}

}
