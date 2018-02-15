import { Component, OnInit } from '@angular/core';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { Task } from '../../../../store/model/entities/task.model';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { ProductActions } from '../../../../store/action/entities/product.action';
import { TaskActions } from '../../../../store/action/entities/task.action';
import { selectTasks } from '../../../../store/selectors/entities/tasks.selector';
import { selectTasksForSelection, selectTaskArrayForSelection } from '../../../../store/selectors/selection/selection.selector';
import { DialogActions } from '../../../../store/action/ui/dialog.action';
import { DialogName } from '../../../../store/model/ui/dialog.model';
import { TaskSlctnActions } from '../../../../store/action/selection/task-selection.action';

@Component({
	selector: 'app-product-tasks',
	templateUrl: './product-tasks.component.html',
	styleUrls: ['./product-tasks.component.scss']
})
export class ProductTasksComponent extends AutoUnsub implements OnInit {

	tasks$: Observable<Array<Task>>;

	constructor(private route: ActivatedRoute, private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.tasks$ = this.store.select(selectTaskArrayForSelection);
	}

	openDialog() {
		this.store.dispatch(DialogActions.open(DialogName.NEW_TASK));
	}

	onNewTask(task: Task) {
		this.store.dispatch(TaskSlctnActions.add(task));
	}
}
