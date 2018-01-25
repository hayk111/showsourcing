import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { Store } from '@ngrx/store';
import { EntityState } from '../../../../store/utils/entities.utils';
import { FilterGroupName, Filter } from '../../../../store/model/misc/filter.model';
import { Task } from '../../../../store/model/entities/task.model';
import { TaskActions } from '../../../../store/action/entities/task.action';
import { selectTasks } from '../../../../store/selectors/entities/tasks.selector';
import { DialogActions } from '../../../../store/action/ui/dialog.action';
import { DialogName } from '../../../../store/model/ui/dialog.model';


@Component({
	selector: 'tasks-page-app',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss'],
})
export class TasksPageComponent extends AutoUnsub implements OnInit {
	filterGroupName = FilterGroupName.TASKS_PAGE;
	filters$: Observable<Filter> = new Observable();
	tasks$;
	tasksEntities: EntityState<Task>;
	pending = true;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.store.dispatch(TaskActions.load(this.filterGroupName));
		this.tasks$ = this.store.select(selectTasks);
		this.tasks$.takeUntil(this._destroy$)
			.subscribe(t => this.onItemsReceived(t));
	}

	onItemsReceived(items: EntityState<Task>) {
		this.tasksEntities = items;
		this.pending = items.pending;
	}

	onItemClicked(id: string) {
		this.store.dispatch(DialogActions.open(DialogName.TASK));
		this.store.dispatch(DialogActions.setMetadata(DialogName.TASK, { id }));
	}

}
