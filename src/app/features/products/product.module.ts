import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { CommentCommonModule } from '~common/comment';
import { ProductCommonModule } from '~common/product';
import { RequestCommonModule } from '~common/request';
import { SampleCommonModule } from '~common/sample';
import { SupplierCommonModule } from '~common/supplier';
import { TaskCommonModule } from '~common/task';
import { routes } from '~features/products/routes';
import { NavBarModule } from '~shared/navbar';
import { SharedModule } from '~shared/shared.module';

import {
	ProductActivityComponent,
	ProductHeaderDetailsComponent,
	ProductDetailsPageComponent,
	ProductSamplesComponent,
	ProductInfoComponent,
	ProductFilesComponent,
	ProductsPageComponent,
	ProductTasksComponent,
	ProductActivityNavComponent
} from './pages';
import { ProductFeatureService, QuoteFeatureService } from './services';
import { AttachmentCommonModule } from '~common/attachment/attachment-common.module';



@NgModule({
	imports: [
		SharedModule,
		ActivityCommonModule,
		CommentCommonModule,
		CommonModule,
		NavBarModule,
		ProductCommonModule,
		RequestCommonModule,
		RouterModule.forChild(routes),
		SampleCommonModule,
		SupplierCommonModule,
		TaskCommonModule,
		AttachmentCommonModule
	],
	declarations: [
		ProductActivityComponent,
		ProductDetailsPageComponent,
		ProductSamplesComponent,
		ProductInfoComponent,
		ProductFilesComponent,
		ProductTasksComponent,
		ProductHeaderDetailsComponent,
		ProductsPageComponent,
		ProductActivityNavComponent,
	],
	entryComponents: [],
	exports: [],
	providers: [
		ProductFeatureService,
		QuoteFeatureService
	]
})
export class ProductModule {

}
