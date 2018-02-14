import { Component, OnInit } from '@angular/core';
import { FilterGroupName, Filter } from '../../../../store/model/misc/filter.model';
import { Observable } from 'rxjs/Observable';
import { AutoUnsub } from '../../../../../utils/auto-unsub.component';
import { TaskActions } from '../../../../store/action/entities/task.action';
import { Store } from '@ngrx/store';
import { Task } from '../../../../store/model/entities/task.model';
import { EntityState } from '../../../../store/utils/entities.utils';
import { selectTags } from '../../../../store/selectors/entities/tags.selector';
import { selectTasks } from '../../../../store/selectors/entities/tasks.selector';
import { DialogActions } from '../../../../store/action/ui/dialog.action';
import { DialogName } from '../../../../store/model/ui/dialog.model';
import { map } from 'rxjs/operators';


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
	pending$: Observable<boolean>;

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.tasks$ = this.store.select(selectTasks);
		this.pending$ = this.tasks$.pipe(map((t: any) => t.pending));
	}



	onItemClicked(id: string) {
		this.store.dispatch(DialogActions.open(DialogName.TASK));
		this.store.dispatch(DialogActions.setMetadata(DialogName.TASK, { id }));
	}

}
