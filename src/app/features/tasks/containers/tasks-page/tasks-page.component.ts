import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { ERM } from '~entity';
import { DialogActions, DialogName } from '~shared/dialog';
import { FilterGroupName, selectFilteredEntity } from '~shared/filters';
import { selectTasks, taskActions } from '~task';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'tasks-page-app',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss'],
})
export class TasksPageComponent extends AutoUnsub implements OnInit {
	filterGroupName = FilterGroupName.TASKS_PAGE;
	tasks$;
	pending$: Observable<boolean>;
	repr = ERM.tasks;
	selection = new Map<string, boolean>();

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.store.dispatch(taskActions.load());
		this.tasks$ = this.store.select(selectFilteredEntity(this.filterGroupName, this.repr));
		this.pending$ = this.store.select(selectTasks).pipe(map((t: any) => t.pending));
	}

	openNewTaskDlg() {
		this.store.dispatch(DialogActions.open(DialogName.NEW_TASK));
	}

	onItemSelected(entityId: string) {
		this.selection.set(entityId, true);
	}

	onItemUnselected(entityId: string) {
		this.selection.delete(entityId);
	}
}
