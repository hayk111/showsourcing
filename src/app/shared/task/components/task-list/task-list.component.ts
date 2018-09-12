import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '~models';
import { BaseComponent } from '~shared/base-component/base-component';

@Component({
	selector: 'task-list-app',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent extends BaseComponent implements OnInit {

	@Input() tasks: Task[];
	@Input() selection: Map<string, boolean>;
	@Input() fullUser = false;
	@Input() hasSupplier = true;
	@Input() hasProduct = false;
	@Output() taskSelect = new EventEmitter<Task>();
	@Output() taskUnselect = new EventEmitter<Task>();
	@Output() openCreateDlg = new EventEmitter<null>();
	@Output() bottomReached = new EventEmitter<null>();
	@Output() previewClicked =  new EventEmitter<Task>();

	hoverIndex: number;

	constructor() {
		super();
	}

	ngOnInit() {
	}

	hoverRow(index: number) {
		this.hoverIndex = index;
	}

}
