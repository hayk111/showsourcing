import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductCommonModule } from '~common/product/product-common.module';
import { DialogModule } from '~shared/dialog';
import { DynamicFormsModule } from '~shared/dynamic-forms';
import { IconsModule } from '~shared/icons';
import { ImageModule } from '~shared/image/image.module';
import { InputsModule } from '~shared/inputs';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { SharedModule } from '~shared/shared.module';
import { UserPictureModule } from '~shared/user-picture';
import { UtilsModule } from '~shared/utils';
import { TaskListComponent, TaskComponent, PreviewTaskComponent, CreateTaskDialogComponent } from './components';



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
		ScrollingModule
	],
	declarations: [
		TaskListComponent,
		TaskComponent,
		CreateTaskDialogComponent,
		PreviewTaskComponent
	],
	exports: [
		TaskListComponent,
		TaskComponent,
		CreateTaskDialogComponent,
		PreviewTaskComponent
	],
	entryComponents: [CreateTaskDialogComponent]
})
export class TaskCommonModule { }
