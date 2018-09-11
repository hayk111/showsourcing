import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DEFAULT_IMG } from '~utils';
import { Task } from '~models';

@Component({
	selector: 'task-app',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent implements OnInit {

	@Input() fullUser = false;
	@Input() task: Task;
	@Input() hasSupplier: boolean;
	@Input() hasProduct: boolean;

	defaultImg = DEFAULT_IMG;

	constructor() { }

	ngOnInit() { }

	get getStatus() {
		let status = 'pending';
		if (this.task.done)
			status = 'done';
		else if (this.task.dueDate && (new Date().getTime() >= Date.parse(this.task.dueDate.toString())))
			status = 'overdue';
		return status;
	}
}
