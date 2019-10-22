import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { AttachmentCommonModule } from '~common/attachment/attachment-common.module';
import { CommentCommonModule } from '~common/comment';
import { PreviewsCommonModule } from '~common/previews/previews-common.module';
import { ProductCommonModule } from '~common/product';
import { SupplierCommonModule } from '~common/supplier';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { routes } from '~features/products/routes';
import { NavBarModule } from '~shared/navbar';
import { SharedModule } from '~shared/shared.module';

import {
	ProductActivityComponent,
	ProductActivityNavComponent,
	ProductDetailsPageComponent,
	ProductFilesComponent,
	ProductHeaderDetailsComponent,
	ProductInfoComponent,
	ProductSamplesComponent,
	ProductsPageComponent,
	ProductTasksComponent,
} from './pages';
import { ProductFeatureService, QuoteFeatureService } from './services';



@NgModule({
	imports: [
		SharedModule,
		ActivityCommonModule,
		CommentCommonModule,
		CommonModule,
		NavBarModule,
		ProductCommonModule,
		RouterModule.forChild(routes),
		SupplierCommonModule,
		AttachmentCommonModule,
		PreviewsCommonModule,
		TablesCommonModule
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
