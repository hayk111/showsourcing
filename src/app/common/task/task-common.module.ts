import { NgModule } from '@angular/core';
import { CommentCommonModule } from '~common/comment';
import { ProductCommonModule } from '~common/product/product-common.module';
import { SharedModule } from '~shared/shared.module';

import { TaskComponent, TaskListComponent, TaskPreviewComponent } from './components';
import { BannerTaskComponent } from './components/banner-task/banner-task.component';



@NgModule({
	imports: [
		SharedModule,
		ProductCommonModule,
		ProductCommonModule,
		CommentCommonModule
	],
	declarations: [
		TaskListComponent,
		TaskComponent,
		TaskPreviewComponent,
		BannerTaskComponent
	],
	exports: [
		TaskListComponent,
		TaskComponent,
		TaskPreviewComponent,
		BannerTaskComponent
	],
	entryComponents: []
})
export class TaskCommonModule { }
