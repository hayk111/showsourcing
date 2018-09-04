import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Task } from '~models';

@Component({
	selector: 'task-list-app',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {

	@Input() hasProduct = true;
	@Input() tasks: Task[];

	constructor() { }

	ngOnInit() {
	}

}
