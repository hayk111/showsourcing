import { NgModule } from '@angular/core';
import { CommentCommonModule } from '~common/comment';
import { SharedModule } from '~shared/shared.module';

import { TaskComponent, TaskPreviewComponent, TaskTableComponent } from './components';
import { BannerTaskComponent } from './components/banner-task/banner-task.component';
import { TaskListViewComponent } from './components/task-list-view/task-list-view.component';



@NgModule({
	imports: [
		SharedModule,
		CommentCommonModule
	],
	declarations: [
		TaskComponent,
		TaskPreviewComponent,
		BannerTaskComponent,
		TaskTableComponent,
		TaskListViewComponent
	],
	exports: [
		TaskComponent,
		TaskPreviewComponent,
		BannerTaskComponent,
		TaskTableComponent,
		TaskListViewComponent
	],
	entryComponents: []
})
export class TaskCommonModule { }
