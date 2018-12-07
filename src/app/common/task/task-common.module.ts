import { NgModule } from '@angular/core';
import { CommentCommonModule } from '~common/comment';
import { ProductCommonModule } from '~common/product/product-common.module';
import { SharedModule } from '~shared/shared.module';

import { CreateTaskDialogComponent, TaskComponent, TaskListComponent, TaskPreviewComponent } from './components';
import { BannerTaskComponent } from './components/banner-task/banner-task.component';



@NgModule({
	imports: [
		SharedModule,
		ProductCommonModule,
		CommentCommonModule
	],
	declarations: [
		TaskListComponent,
		TaskComponent,
		CreateTaskDialogComponent,
		TaskPreviewComponent,
		BannerTaskComponent
	],
	exports: [
		TaskListComponent,
		TaskComponent,
		CreateTaskDialogComponent,
		TaskPreviewComponent,
		BannerTaskComponent
	],
	entryComponents: [CreateTaskDialogComponent]
})
export class TaskCommonModule { }
