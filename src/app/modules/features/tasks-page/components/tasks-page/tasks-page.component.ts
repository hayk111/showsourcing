import { Component, OnInit } from '@angular/core';
import { FilterGroupName, Filter, entityRepresentationMap } from '../../../../store/model/filter.model';
import { Observable } from 'rxjs/Observable';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { TeamItemLoaderService } from '../../../../shared/filtered-list-page/services/team-item-loader.service';
import { TaskActions } from '../../../../store/action/task.action';
import { Store } from '@ngrx/store';
import { Task } from '../../../../store/model/task.model';
import { EntityState } from '../../../../store/utils/entities.utils';
import { selectTags } from '../../../../store/selectors/tags.selector';
import { selectTasks } from '../../../../store/selectors/tasks.selector';
import { DialogActions } from '../../../../store/action/dialog.action';
import { DialogName } from '../../../../store/model/dialog.model';


@Component({
	selector: 'tasks-page-app',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss'],
	providers: [ TeamItemLoaderService ]
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

	constructor(private itemLoader: TeamItemLoaderService, private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.itemLoader.init('task', TaskActions, this.filterGroupName);
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
