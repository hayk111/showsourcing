import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogModule } from '~shared/dialog/dialog.module';
import { InputsModule } from '~shared/inputs';
import { LoadersModule } from '~shared/loaders';
import { SelectionBarModule } from '~shared/selection-bar';
import { UtilsModule } from '~shared/utils';

import { TasksListViewComponent } from './components/tasks-list-view/tasks-list-view.component';
import { TasksPageComponent } from './containers/tasks-page/tasks-page.component';
import { routes } from './router';
import { TableModule } from '~app/shared/table';
import { EntityPagesModule } from '~app/shared/entity-pages/entity-pages.module';
import { NewTaskDlgComponent } from '~app/features/tasks/containers';
import { SharedModule } from '~app/shared/shared.module';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([]),
		ReactiveFormsModule, // TODO check if used
		EntityPagesModule, // used for bread crumb etc
		SelectionBarModule, // used for selection at the bottom
		DialogModule, // TODO check if used
		TableModule, // used by list
	],
	declarations: [NewTaskDlgComponent, TasksPageComponent, TasksListViewComponent],
	entryComponents: [NewTaskDlgComponent],
	exports: [TasksListViewComponent],
	providers: [],
})
export class TasksModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: TasksModule,
			providers: [],
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: TasksModule,
		};
	}
}
