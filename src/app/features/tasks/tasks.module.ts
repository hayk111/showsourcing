import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DialogModule } from '~dialog/dialog.module';
import { InputsModule } from '~shared/inputs';
import { LoadersModule } from '~shared/loaders';
import { SelectionBarModule } from '~shared/selection-bar';
import { UtilsModule } from '~shared/utils';
import { EntityModule } from '~entity';

import { TasksListViewComponent } from './components/tasks-list-view/tasks-list-view.component';
import { TasksPageComponent } from './containers/tasks-page/tasks-page.component';
import { routes } from './router';
import { TableModule } from '~app/shared/table';
import { EntityPagesModule } from '~app/shared/entity-pages/entity-pages.module';
import { NewTaskDlgComponent } from '~app/features/tasks/containers';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule, // TODO REMOVE UNUSED MODULES
		EntityModule.forChild(),
		EntityPagesModule,
		UtilsModule, // TODO REMOVE UNUSED MODULES
		LoadersModule, // TODO REMOVE UNUSED MODULES
		SelectionBarModule, // TODO REMOVE UNUSED MODULES
		DialogModule, // TODO REMOVE UNUSED MODULES
		InputsModule, // TODO REMOVE UNUSED MODULES
		TableModule, // used by list
	],
	declarations: [NewTaskDlgComponent, TasksPageComponent, TasksListViewComponent],
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
