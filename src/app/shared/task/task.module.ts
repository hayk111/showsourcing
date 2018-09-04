import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPictureModule } from '~shared/user-picture';
import { UtilsModule } from '~shared/utils';
import { TaskListComponent } from '~shared/task/components/task-list/task-list.component';
import { TaskComponent } from '~shared/task/components/task/task.component';
import { ImageModule } from '~shared/image/image.module';
import { InputsModule } from '~shared/inputs';
import { IconsModule } from '~shared/icons';

@NgModule({
	imports: [
		CommonModule,
		UserPictureModule,
		UtilsModule,
		ImageModule,
		InputsModule,
		UserPictureModule,
		IconsModule
	],
	declarations: [TaskListComponent, TaskComponent],
	exports: [TaskListComponent, TaskComponent]
})
export class TaskModule { }
