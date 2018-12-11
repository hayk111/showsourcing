import { NgModule } from '@angular/core';
import { CommentCommonModule } from '~common/comment';
import { ProductCommonModule } from '~common/product/product-common.module';
import { ProductElementModule } from '~common/product/product-elements-module';
import { SharedModule } from '~shared/shared.module';

import { TaskComponent, TaskListComponent, TaskPreviewComponent } from './components';
import { BannerTaskComponent } from './components/banner-task/banner-task.component';



@NgModule({
	imports: [
		SharedModule,
		ProductCommonModule,
		ProductElementModule,
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
