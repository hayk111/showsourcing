import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '~models';

@Component({
	selector: 'task-list-app',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {

	@Input() tasks: Task[];
	@Input() selection: Map<string, boolean>;
	@Input() fullUser = false;
	@Output() taskSelect = new EventEmitter<Task>();
	@Output() taskUnselect = new EventEmitter<Task>();
	@Output() openCreateDlg = new EventEmitter<null>();

	hoverIndex: number;

	trackByFn = (index, item) => item.id;

	constructor() { }

	ngOnInit() {
	}

	hoverRow(index: number) {
		this.hoverIndex = index;
	}

}
