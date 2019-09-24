import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { CommentCommonModule } from '~common/comment';
import { RequestCommonModule } from '~common/request';
import { SampleCommonModule } from '~common/sample';
import { SupplierCommonModule } from '~common/supplier';
import { ProductCommonModule } from '~common/product';
import { TaskCommonModule } from '~common/task';
import { NavBarModule } from '~shared/navbar';
import { SharedModule } from '~shared/shared.module';
import { SamplesPageComponent } from './containers';
import { SamplesListViewComponent } from './components';
import { routes } from '~features/samples/routes';

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		ActivityCommonModule,
		CommentCommonModule,
		CommonModule,
		NavBarModule,
		RequestCommonModule,
		SampleCommonModule,
		ProductCommonModule,
		SharedModule,
		SupplierCommonModule,
		TaskCommonModule,
	],
	declarations: [
		SamplesPageComponent,
		SamplesListViewComponent,
	],
	entryComponents: [],
	exports: [],
	providers: [
	]
})
export class SampleModule {

}
