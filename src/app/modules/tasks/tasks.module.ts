import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksPageComponent } from './containers/tasks-page/tasks-page.component';
import { TasksListViewComponent } from './components/tasks-list-view/tasks-list-view.component';
import { DialogModule } from '~shared/dialog/dialog.module';
import { EntityPageModule } from '~shared/entity-page/entity-page.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppStoreModule } from '~store/store.module';
import { UserModule } from '~user';
import { UtilsModule } from '~shared/utils/utils.module';
import { TaskModule } from '~shared/task/task.module';
import { LoadersModule } from '~shared/loaders/loaders.module';
import { SelectionBarModule } from '~shared/selection-bar/selection-bar.module';
import { SelectModule } from '~shared/select/select.module';
import { InputsModule } from '~shared/inputs/inputs.module';
import { NewTaskDlgComponent } from '~tasks/containers';

@NgModule({
	imports: [
		CommonModule,
		EntityPageModule,
		NgxDatatableModule,
		AppStoreModule.forRoot(),
		UserModule,
		UtilsModule,
		TaskModule,
		LoadersModule,
		SelectionBarModule,
    DialogModule,
    InputsModule,
    SelectModule
	],
	declarations: [
    NewTaskDlgComponent,
		TasksPageComponent,
		TasksListViewComponent,
	],
	exports: [
		TasksListViewComponent
	]
})
export class TasksModule { }

