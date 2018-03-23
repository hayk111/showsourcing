import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { selectProductFocused } from '../../store';
import { Store } from '@ngrx/store';
import { AutoUnsub } from '~utils';
import { Observable } from 'rxjs/Observable';

import { Product } from '~products/models';
import { DialogActions } from '~dialog';
import { Task, selectTasks } from '~tasks';
import { DialogName } from '~dialog';
import { taskActions } from '~app/features/tasks/store';

@Component({
	selector: 'app-product-tasks',
	templateUrl: './product-tasks.component.html',
	styleUrls: ['./product-tasks.component.scss'],
})
export class ProductTasksComponent extends AutoUnsub implements OnInit {
	product$: Observable<Product>;
	tasks$: Observable<Array<Task>>;

	constructor(private route: ActivatedRoute, private store: Store<any>) {
		super();
	}

	ngOnInit() {
		// send request to load tasks for product
		this.tasks$ = this.store.select(selectTasks);
		this.product$ = this.store.select(selectProductFocused);
	}

	openDialog() {
		this.store.dispatch(DialogActions.open(DialogName.NEW_TASK));
	}

	onNewTask(task: Task) {
		this.store.dispatch(taskActions.create(task));
	}
}
