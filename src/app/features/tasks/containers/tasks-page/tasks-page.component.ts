import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ERM } from '~app/entity';
import { DialogName, DialogService } from '~shared/dialog';
import { FilterGroupName } from '~shared/filters';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'tasks-page-app',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss'],
})
export class TasksPageComponent extends AutoUnsub implements OnInit {
	tasks$;
	pending$: Observable<boolean>;
	repr = ERM.task;
	selection = new Map<string, boolean>();

	constructor(private store: Store<any>, private dlgSrv: DialogService) {
		super();
	}

	ngOnInit() {
		// this.store.dispatch(fromTask.Actions.load());
		// this.tasks$ = this.store.select(fromTask.selectArray);
		// this.pending$ = this.store.select(fromTask.selectState).pipe(map((t: any) => t.pending));
	}

	openNewTaskDlg() {
		this.dlgSrv.open(DialogName.NEW_TASK);
	}

	onItemSelected(entityId: string) {
		this.selection.set(entityId, true);
	}

	onItemUnselected(entityId: string) {
		this.selection.delete(entityId);
	}
}
