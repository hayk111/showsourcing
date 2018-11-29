import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TasksListViewComponent } from '~features/tasks/components/tasks-list-view/tasks-list-view.component';
import { NewTaskDlgComponent } from '~features/tasks/containers';
import { TasksPageComponent } from '~features/tasks/containers/tasks-page/tasks-page.component';
import { routes } from '~features/tasks/router';
import { SharedModule } from '~shared/shared.module';

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
	],
	declarations: [NewTaskDlgComponent, TasksPageComponent, TasksListViewComponent],
	entryComponents: [NewTaskDlgComponent],
	exports: [TasksListViewComponent],
})
export class TasksModule {

}
