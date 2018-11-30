import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductCommonModule } from '~common/product/product-common.module';
import { SharedModule } from '~shared/shared.module';

import { CreateTaskDialogComponent, PreviewTaskComponent, TaskComponent, TaskListComponent } from './components';
import { BannerTaskComponent } from './components/banner-task/banner-task.component';



@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		ProductCommonModule,
	],
	declarations: [
		TaskListComponent,
		TaskComponent,
		CreateTaskDialogComponent,
		PreviewTaskComponent,
		BannerTaskComponent
	],
	exports: [
		TaskListComponent,
		TaskComponent,
		CreateTaskDialogComponent,
		PreviewTaskComponent,
		BannerTaskComponent
	],
	entryComponents: [CreateTaskDialogComponent]
})
export class TaskCommonModule { }
