import { Component, OnInit } from '@angular/core';
import { FilterGroupName, Filter } from '~store/model/misc/filter.model';
import { Observable } from 'rxjs/Observable';
import { AutoUnsub } from '~utils/index';
import { TaskActions } from '~store/action/entities/index';
import { Store } from '@ngrx/store';
import { Task } from '../../models';
import { EntityState, EntityRepresentation, entityRepresentationMap } from '~store/utils/entities.utils';
import { selectTasks } from '../../store/selectors';
import { DialogActions } from '~dialog';
import { DialogName } from '~dialog';
import { map } from 'rxjs/operators';
import { selectFilteredEntity } from '~store/selectors/misc/filter.selectors';

@Component({
	selector: 'tasks-page-app',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss'],
})
export class TasksPageComponent extends AutoUnsub implements OnInit {
	filterGroupName = FilterGroupName.TASKS_PAGE;
	tasks$;
	pending$: Observable<boolean>;
	repr = entityRepresentationMap.tasks;
	selections = new Map<string, boolean>();

	constructor(private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.tasks$ = this.store.select(selectFilteredEntity(this.filterGroupName, this.repr));
		this.pending$ = this.store.select(selectTasks).pipe(map((t: any) => t.pending));
	}

	openNewTaskDlg() {
		this.store.dispatch(DialogActions.open(DialogName.NEW_TASK));
	}

	onItemSelected(entityId: string) {
		this.selections.set(entityId, true);
	}

	onItemUnselected(entityId: string) {
		this.selections.delete(entityId);
	}

}
