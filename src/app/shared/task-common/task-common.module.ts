import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPictureModule } from '~shared/user-picture';
import { UtilsModule } from '~shared/utils';
import { TaskListComponent } from '~shared/task-common/components/task-list/task-list.component';
import { TaskComponent } from '~shared/task-common/components/task/task.component';
import { ImageModule } from '~shared/image/image.module';
import { InputsModule } from '~shared/inputs';
import { IconsModule } from '~shared/icons';
import { CreateTaskDialogComponent } from './components/create-task-dialog/create-task-dialog.component';
import { DialogModule } from '~shared/dialog';
import { SharedModule } from '~shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		UserPictureModule,
		UtilsModule,
		ImageModule,
		InputsModule,
		UserPictureModule,
		IconsModule,
		DialogModule,
		SharedModule
	],
	declarations: [TaskListComponent, TaskComponent, CreateTaskDialogComponent],
	exports: [TaskListComponent, TaskComponent, CreateTaskDialogComponent],
	entryComponents: [CreateTaskDialogComponent]
})
export class TaskCommonModule { }
