import { Component, OnInit, NgModuleRef } from '@angular/core';
import { ERM } from '~models';
import { Observable } from 'rxjs';
import { DialogService } from '~shared/dialog';
import { AutoUnsub } from '~utils';
import { NewTaskDlgComponent } from '~features/tasks/containers/new-task-dlg/new-task-dlg.component';
import { ListPageProviders, ProviderKey } from '~core/list-page/list-page-providers.class';

@Component({
	selector: 'tasks-page-app',
	templateUrl: './tasks-page.component.html',
	styleUrls: ['./tasks-page.component.scss'],
	providers: [
		ListPageProviders.getProviders(ProviderKey.TASK, ERM.TASK),
	]
})
export class TasksPageComponent extends AutoUnsub implements OnInit {
	tasks$;
	pending$: Observable<boolean>;
	selection = new Map<string, boolean>();

	constructor(
		private dlgSrv: DialogService,
		private moduleRef: NgModuleRef<any>
	) {
		super();
	}

	ngOnInit() {
		// this.store.dispatch(fromTask.Actions.load());
		// this.tasks$ = this.store.select(fromTask.selectArray);
		// this.pending$ = this.store.select(fromTask.selectState).pipe(map((t: any) => t.pending));
	}

	openNewTaskDlg() {
		this.dlgSrv.openFromModule(NewTaskDlgComponent, this.moduleRef);
	}

	onItemSelected(entityId: string) {
		this.selection.set(entityId, true);
	}

	onItemUnselected(entityId: string) {
		this.selection.delete(entityId);
	}
}
