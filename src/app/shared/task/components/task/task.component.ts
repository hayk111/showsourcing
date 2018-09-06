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
	defaultImg = DEFAULT_IMG;
	tempU = { firstName: 'miau', lastName: 'wow' } as any;

	constructor() { }

	ngOnInit() { }

	get getStatus() {
		let status = 'pending';
		if (this.task.done)
			status = 'done';
		else if (this.task.dueDate && (Date.parse(this.task.dueDate.toString()) > new Date().getTime()))
			status = 'overdue';
		return status;
	}
}
