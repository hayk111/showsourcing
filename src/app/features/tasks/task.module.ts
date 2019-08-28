import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { CommentCommonModule } from '~common/comment';
import { RequestCommonModule } from '~common/request';
import { SupplierCommonModule } from '~common/supplier';
import { ProductCommonModule } from '~common/product';
import { TaskCommonModule } from '~common/task';
import { NavBarModule } from '~shared/navbar';
import { SharedModule } from '~shared/shared.module';
import { TasksPageComponent } from './containers';
import { TasksListViewComponent } from './components';
import { routes } from '~features/tasks/routes';

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		ActivityCommonModule,
		CommentCommonModule,
		CommonModule,
		NavBarModule,
		RequestCommonModule,
		ProductCommonModule,
		SharedModule,
		SupplierCommonModule,
		TaskCommonModule,
	],
	declarations: [
		TasksPageComponent,
		TasksListViewComponent,
	],
	entryComponents: [],
	exports: [],
	providers: [
	]
})
export class TaskModule {

}
