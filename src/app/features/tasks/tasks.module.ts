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
import { TableModule } from '~shared/table';
import { NewTaskDlgComponent } from '~features/tasks/containers';
import { SharedModule } from '~shared/shared.module';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule, // TODO check if used
		TopPanelModule, // used for bread crumb etc
		SelectionBarModule, // used for selection at the bottom
		DialogModule, // TODO check if used
		TableModule, // used by list
	],
	declarations: [NewTaskDlgComponent, TasksPageComponent, TasksListViewComponent],
	entryComponents: [NewTaskDlgComponent],
	exports: [TasksListViewComponent],
})
export class TasksModule {

}
