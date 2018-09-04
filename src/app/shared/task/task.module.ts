import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPictureModule } from '~shared/user-picture';
import { UtilsModule } from '~shared/utils';
import { TaskListComponent } from '~shared/task/components/task-list/task-list.component';
import { TaskComponent } from '~shared/task/components/task/task.component';

@NgModule({
	imports: [
		CommonModule,
		UserPictureModule,
		UtilsModule
	],
	declarations: [TaskListComponent, TaskComponent],
	exports: [TaskListComponent, TaskComponent]
})
export class TaskModule { }
