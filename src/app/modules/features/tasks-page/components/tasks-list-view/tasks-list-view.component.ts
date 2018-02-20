import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityState, entityStateToArray } from '../../../../store/utils/entities.utils';
import { Product } from '../../../../store/model/entities/product.model';
import { selectSuppliers } from '../../../../store/selectors/entities/suppliers.selector';
import { Task } from '../../../../store/model/entities/task.model';

@Component({
	selector: 'tasks-list-view-app',
	templateUrl: './tasks-list-view.component.html',
	styleUrls: ['./tasks-list-view.component.scss']
})
export class TasksListViewComponent implements OnInit {
	@Input() selections: Map<string, boolean>;
	@Output() taskSelect = new EventEmitter<string>();
	@Output() taskUnselect = new EventEmitter<string>();
	private _tasks: Array<Task> = [];

	cols = {
		status: true,
		type: true,
		description: true,
		product: true,
		owner: true
	}

	constructor() { }

	ngOnInit() {
	}

	onSelect(event, id: string) {
		if (event.target.checked)
			this.taskSelect.emit(id);
		else
			this.taskUnselect.emit(id);
		event.stopPropagation();
	}

	@Input()
	set tasks(tasks: Array<any>) {
		if (tasks)
			this._tasks = tasks.reverse();
	}

	get tasks() {
		return this._tasks;
	}

	@Input()
	set removedCols(arr: Array<string>) {
		arr.forEach(c => {
			this.cols[c] = false;
		});
	}

}
