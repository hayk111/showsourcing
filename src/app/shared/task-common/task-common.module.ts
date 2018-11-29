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
import { DynamicFormsModule } from '~shared/dynamic-forms';
import { ProductCommonModule } from '~shared/product-common/product-common.module';
import { PreviewTaskComponent } from '~shared/task-common/components/preview-task/preview-task.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PreviewModule } from '~shared/preview';
import { DescriptionModule } from '~shared/description';
import { BannerTaskComponent } from './components/banner-task/banner-task.component';

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
		SharedModule,
		OverlayModule,
		SelectorsModule,
		ScrollingModule,
		PreviewModule,
		DescriptionModule
	],
	declarations: [TaskListComponent, TaskComponent, CreateTaskDialogComponent, PreviewTaskComponent, BannerTaskComponent],
	exports: [TaskListComponent, TaskComponent, CreateTaskDialogComponent, PreviewTaskComponent],
	entryComponents: [CreateTaskDialogComponent]
})
export class TaskCommonModule { }
