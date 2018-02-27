import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DialogModule } from '~dialog/dialog.module';
import { EntityPageModule } from '~shared/entity-page';
import { InputsModule } from '~shared/inputs';
import { LoadersModule } from '~shared/loaders';
import { SelectModule } from '~shared/select';
import { SelectionBarModule } from '~shared/selection-bar';
import { UtilsModule } from '~shared/utils';
import { AppStoreModule } from '~store/store.module';
import { NewTaskDlgComponent } from '~tasks/containers';
import { UserModule } from '~user';

import { TasksListViewComponent } from './components/tasks-list-view/tasks-list-view.component';
import { TasksPageComponent } from './containers/tasks-page/tasks-page.component';
import { routes } from './router';
import { TaskService } from './services';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule, // TODO REMOVE UNUSED MODULES
		EntityPageModule, // TODO REMOVE UNUSED MODULES
		NgxDatatableModule, // TODO REMOVE UNUSED MODULES
		AppStoreModule.forRoot(), // TODO REMOVE UNUSED MODULES
		UserModule, // TODO REMOVE UNUSED MODULES
		UtilsModule, // TODO REMOVE UNUSED MODULES
		LoadersModule, // TODO REMOVE UNUSED MODULES
		SelectionBarModule, // TODO REMOVE UNUSED MODULES
		DialogModule, // TODO REMOVE UNUSED MODULES
		InputsModule, // TODO REMOVE UNUSED MODULES
		SelectModule, // TODO REMOVE UNUSED MODULES
	],
	declarations: [NewTaskDlgComponent, TasksPageComponent, TasksListViewComponent],
	exports: [TasksListViewComponent],
	providers: [TaskService],
})
export class TasksModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: TasksModule,
			providers: [TaskService],
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: TasksModule,
		};
	}
}