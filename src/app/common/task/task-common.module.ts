import { NgModule } from '@angular/core';
import { CommentCommonModule } from '~common/comment';
import { ProductCommonModule } from '~common/product/product-common.module';
import { SharedModule } from '~shared/shared.module';

import { TaskComponent, TaskPreviewComponent, TaskListViewComponent } from './components';
import { BannerTaskComponent } from './components/banner-task/banner-task.component';



@NgModule({
	imports: [
		SharedModule,
		ProductCommonModule,
		ProductCommonModule,
		CommentCommonModule
	],
	declarations: [
		TaskComponent,
		TaskPreviewComponent,
		BannerTaskComponent,
		TaskListViewComponent
	],
	exports: [
		TaskComponent,
		TaskPreviewComponent,
		BannerTaskComponent,
		TaskListViewComponent
	],
	entryComponents: []
})
export class TaskCommonModule { }
