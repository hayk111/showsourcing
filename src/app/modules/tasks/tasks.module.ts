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
import { LoadersModule } from '~shared/loaders/loaders.module';
import { SelectionBarModule } from '~shared/selection-bar/selection-bar.module';
import { SelectModule } from '~shared/select/select.module';
import { InputsModule } from '~shared/inputs/inputs.module';
import { NewTaskDlgComponent } from '~tasks/containers';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule, // TODO REMOVE UNUSED MODULES
		EntityPageModule,  // TODO REMOVE UNUSED MODULES
		NgxDatatableModule,  // TODO REMOVE UNUSED MODULES
		AppStoreModule.forRoot(),  // TODO REMOVE UNUSED MODULES
		UserModule,  // TODO REMOVE UNUSED MODULES
		UtilsModule,  // TODO REMOVE UNUSED MODULES
		LoadersModule,  // TODO REMOVE UNUSED MODULES
		SelectionBarModule,  // TODO REMOVE UNUSED MODULES
    DialogModule,  // TODO REMOVE UNUSED MODULES
    InputsModule,  // TODO REMOVE UNUSED MODULES
    SelectModule  // TODO REMOVE UNUSED MODULES
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

