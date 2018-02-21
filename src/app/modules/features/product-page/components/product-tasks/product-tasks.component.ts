import { Component, OnInit, Input } from '@angular/core';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { Task } from '../../../../store/model/entities/task.model';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { TaskActions } from '../../../../store/action/entities/task.action';
import { selectTasks } from '../../../../store/selectors/entities/tasks.selector';
import {
	selectTasksForCurrentTarget,
	selectTaskArrayForCurrentTarget,
	selectProductSelected
} from '../../../../store/selectors/target/target.selector';
import { DialogActions } from '../../../../store/action/ui/dialog.action';
import { DialogName } from '../../../../store/model/ui/dialog.model';
import { TaskTargetActions } from '../../../../store/action/target/task.action';
import { selectProductById, Product } from '../../../../products';

@Component({
	selector: 'app-product-tasks',
	templateUrl: './product-tasks.component.html',
	styleUrls: ['./product-tasks.component.scss']
})
export class ProductTasksComponent extends AutoUnsub implements OnInit {
	product$: Observable<Product>;
	tasks$: Observable<Array<Task>>;

	constructor(private route: ActivatedRoute, private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.tasks$ = this.store.select(selectTaskArrayForCurrentTarget);
		this.product$ = this.store.select(selectProductSelected);
	}

	openDialog() {
		this.store.dispatch(DialogActions.open(DialogName.NEW_TASK));
	}

	onNewTask(task: Task) {
		this.store.dispatch(TaskTargetActions.add(task));
	}
}
