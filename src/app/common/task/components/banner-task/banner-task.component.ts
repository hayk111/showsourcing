import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '~core/models';

@Component({
	selector: 'banner-task-app',
	templateUrl: './banner-task.component.html',
	styleUrls: ['./banner-task.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerTaskComponent implements OnInit {

	@Input() set task(task: Task) {
		this._task = task;
		this.status = 'pending';
		if (task.done)
			this.status = 'done';
		else if (task.dueDate && (new Date().getTime() >= Date.parse(task.dueDate.toString())))
			this.status = 'overdue';
	}
	get task() {
		return this._task;
	}
	@Output() update = new EventEmitter<any>();
	_task: Task;
	status: 'overdue' | 'done' | 'pending' = 'pending';

	constructor() { }

	ngOnInit() {
	}

	getStatusText() {
		let text = 'Task ';
		if (status === 'overdue') {
			text = 'Overdue - ' + this.task.dueDate;
		} else {
			text += this.status;
		}
		return text;
	}
}
