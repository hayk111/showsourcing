import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { selectProductFocused } from '../../store';
import { Store } from '@ngrx/store';
import { AutoUnsub } from '~utils';
import { Observable } from 'rxjs/Observable';

import { Product } from '~products/models';
import { TaskTargetActions } from '~store/action/target/task.action';
import { DialogActions } from '~dialog';
import { Task } from '~tasks';
import { DialogName } from '~dialog';
import { selectTaskArrayForCurrentTarget } from '~store/selectors/target/target.selector';

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
		this.tasks$ = this.store.select(selectTaskArrayForCurrentTarget);
		this.product$ = this.store.select(selectProductFocused);
	}

	openDialog() {
		this.store.dispatch(DialogActions.open(DialogName.NEW_TASK));
	}

	onNewTask(task: Task) {
		this.store.dispatch(TaskTargetActions.add(task));
	}
}
