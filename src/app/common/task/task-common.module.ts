import { NgModule } from '@angular/core';
import { CommentCommonModule } from '~common/comment';
import { SharedModule } from '~shared/shared.module';

import { TaskComponent, TaskListViewComponent, TaskPreviewComponent } from './components';
import { BannerTaskComponent } from './components/banner-task/banner-task.component';



@NgModule({
	imports: [
		SharedModule,
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
