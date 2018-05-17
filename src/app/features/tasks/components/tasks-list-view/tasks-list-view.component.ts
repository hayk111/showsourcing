import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Task } from '~models';

@Component({
	selector: 'tasks-list-view-app',
	templateUrl: './tasks-list-view.component.html',
	styleUrls: ['./tasks-list-view.component.scss'],
})
export class TasksListViewComponent implements OnInit {
	@Input() selection: Map<string, boolean>;
	@Input() tasks: Array<Task> = [];
	@Output() taskSelect = new EventEmitter<string>();
	@Output() taskUnselect = new EventEmitter<string>();
	private _tasks: Array<Task> = [];

	cols = {
		status: true,
		type: true,
		description: true,
		product: true,
		owner: true,
	};

	constructor() { }

	ngOnInit() { }

	onSelect(event, id: string) {
		if (event.target.checked) this.taskSelect.emit(id);
		else this.taskUnselect.emit(id);
		event.stopPropagation();
	}
}
