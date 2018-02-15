import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksPageComponent } from './components/tasks-page/tasks-page.component';
import { FilteredListPageModule } from '../../shared/filtered-list-page/filtered-list-page.module';
import { TasksListViewComponent } from './components/tasks-list-view/tasks-list-view.component';
import { DialogModule } from '../../shared/dialog/dialog.module';
import { DynamicFormsModule } from '../../shared/dynamic-forms/dynamic-forms.module';
import { EntityPageModule } from '../../shared/entity-page/entity-page.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppStoreModule } from '../../store/store.module';
import { UserModule } from '../../shared/user/user.module';
import { UtilsModule } from '../../shared/utils/utils.module';
import { TaskModule } from '../../shared/task/task.module';


@NgModule({
	imports: [
		CommonModule,
		EntityPageModule,
		NgxDatatableModule,
		AppStoreModule.forRoot(),
		UserModule,
		UtilsModule,
		TaskModule
	],
	declarations: [
		TasksPageComponent,
		TasksListViewComponent,
	]
})
export class TasksPageModule { }

