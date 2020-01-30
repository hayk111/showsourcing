import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '~core/erm/models';
import { StatusUtils } from '~utils';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'task-catalog-app',
	templateUrl: './task-catalog.component.html',
	styleUrls: ['./task-catalog.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCatalogComponent extends TrackingComponent {

	private _tasks: Task[];
	@Input() set tasks(tasks: Task[]) {
		this._tasks = (tasks || []).sort((a, b) => ((a.done === b.done) ? 0 : (a.done ? 1 : -1)));
	}
	get tasks() {
		return this._tasks;
	}
	@Input() canDisplayMore = false;
	@Output() taskClicked = new EventEmitter<Task>();
	@Output() showMore = new EventEmitter<null>();

	statusUtils = StatusUtils;
	displayIndex = 3;

	constructor() {
		super();
	}

	viewMore() {
		if (this.canDisplayMore)
			this.displayIndex += 3;
		this.showMore.emit();
	}

}
