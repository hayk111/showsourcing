import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '~core/models';
import { TaskStatus } from '~core/models/status.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'banner-task-app',
	templateUrl: './banner-task.component.html',
	styleUrls: ['./banner-task.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerTaskComponent implements OnInit {

	@Input() set task(task: Task) {
		this._task = task;
		this.status = TaskStatus.PENDING;
		if (task.done)
			this.status = TaskStatus.DONE;
		else if (task.dueDate && (new Date().getTime() >= Date.parse(task.dueDate.toString())))
			this.status = TaskStatus.OVERDUE;
	}
	get task() {
		return this._task;
	}
	@Output() update = new EventEmitter<any>();
	@Output() closed = new EventEmitter<null>();
	_task: Task;
	status: TaskStatus = TaskStatus.PENDING;
	enumTaskStatus = TaskStatus;

	constructor(public translate: TranslateService) { }

	ngOnInit() { }

}
