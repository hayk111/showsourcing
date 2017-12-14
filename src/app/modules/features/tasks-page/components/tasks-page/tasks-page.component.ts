import { Component, OnInit } from '@angular/core';
import { FilterGroupName, Filter } from '../../../../store/model/filter.model';
import { Observable } from 'rxjs/Observable';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { TaskActions } from '../../../../store/action/task.action';
import { Store } from '@ngrx/store';
import { Task } from '../../../../store/model/task.model';
import { EntityState, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { selectTags } from '../../../../store/selectors/tags.selector';
import { selectTasks } from '../../../../store/selectors/tasks.selector';
import { DialogActions } from '../../../../store/action/dialog.action';
import { DialogName } from '../../../../store/model/dialog.model';


@Component({
	selector: 'tasks-page-app',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss'],
})
export class TasksPageComponent extends AutoUnsub implements OnInit {
	filterGroupName = FilterGroupName.TASKS_PAGE;
	targets = [
		entityRepresentationMap.categories,
		entityRepresentationMap.productStatus,
		entityRepresentationMap.events,
		entityRepresentationMap.suppliers,
		entityRepresentationMap.projects,
		entityRepresentationMap.ratings
	];
	targetsTask = [
		entityRepresentationMap.tasksStatus,
		entityRepresentationMap.tasksTypes
	];
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
