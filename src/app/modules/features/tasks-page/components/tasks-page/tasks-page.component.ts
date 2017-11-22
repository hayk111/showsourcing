import { Component, OnInit } from '@angular/core';
import { FilterGroupName, Filter, FilterTarget } from '../../../../store/model/filter.model';
import { Observable } from 'rxjs/Observable';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { TeamItemLoaderService } from '../../../../shared/filtered-list-page/services/team-item-loader.service';
import { TaskActions } from '../../../../store/action/task.action';
import { Store } from '@ngrx/store';
import { Task } from '../../../../store/model/task.model';
import { EntityState } from '../../../../store/utils/entities.utils';


@Component({
	selector: 'tasks-page-app',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss'],
	providers: [ TeamItemLoaderService ]
})
export class TasksPageComponent extends AutoUnsub implements OnInit {
	filterGroupName = FilterGroupName.TASKS_PAGE;
	targets = [
		FilterTarget.categories,
		FilterTarget.productStatus,
		FilterTarget.events,
		FilterTarget.suppliers,
		FilterTarget.projects,
		FilterTarget.ratings
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
		this.tasks$ = this.store.select('tasks');
		this.tasks$.takeUntil(this._destroy$)
			.subscribe(t => this.onItemsReceived(t));
	}

	onItemsReceived(items: EntityState<Task>) {
		this.tasksEntities = items;
		this.pending = items.pending;
		// TODO: REMOVE THIS
		setTimeout(() => {}, 40);
	}

}
