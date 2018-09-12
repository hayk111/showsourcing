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
import { PreviewTaskComponent } from '~shared/task-common/components/preview-task/preview-task.component';
import { DialogModule } from '~shared/dialog';
import { SharedModule } from '~shared/shared.module';
import { DynamicFormsModule } from '~shared/dynamic-forms';
import { ProductCommonModule } from '~shared/product-common/product-common.module';

@NgModule({
	imports: [
		CommonModule,
    UserPictureModule,
    ProductCommonModule,
		DynamicFormsModule,
		UtilsModule,
		ImageModule,
		InputsModule,
		UserPictureModule,
		IconsModule,
		DialogModule,
		SharedModule
	],
	declarations: [TaskListComponent, TaskComponent, CreateTaskDialogComponent, PreviewTaskComponent],
	exports: [TaskListComponent, TaskComponent, CreateTaskDialogComponent, PreviewTaskComponent],
	entryComponents: [CreateTaskDialogComponent]
})
export class TaskCommonModule { }
