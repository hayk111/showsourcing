import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
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
	@Output() previewClicked =  new EventEmitter<Task>();

	defaultImg = DEFAULT_IMG;

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
