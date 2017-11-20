import { Component, OnInit } from '@angular/core';
import { FilterGroupName, Filter } from '../../../../store/model/filter.model';
import { Observable } from 'rxjs/Observable';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { TeamItemLoaderService } from '../../../../shared/filtered-list-page/services/team-item-loader.service';
import { TaskActions } from '../../../../store/action/task.action';
import { Store } from '@ngrx/store';
import { Task } from '../../../../store/model/task.model';
import { AsyncEntity } from '../../../../store/utils/async-entity.utils';


@Component({
  selector: 'tasks-page-app',
  templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss'],
	providers: [ TeamItemLoaderService ]
})
export class TasksPageComponent extends AutoUnsub implements OnInit {
	filterGroupName = FilterGroupName.TASKS_PAGE;
	filters$: Observable<Filter> = new Observable();
	tasks$;
	tasks: Array<Task> = [];
	pending = true;

  constructor(private itemLoader: TeamItemLoaderService, private store: Store<any>) {
		super();
	}

  ngOnInit() {
		this.itemLoader.init('task', TaskActions);
		this.tasks$ = this.store.select('tasks');
		this.tasks$.takeUntil(this._destroy$)
			.subscribe(t => this.onItemsReceived(t));
	}
	
	onItemsReceived(items: AsyncEntity<Task>) {
		this.tasks = items.data;
		this.pending = items.pending;
		setTimeout(() => {}, 100)
	}

}
