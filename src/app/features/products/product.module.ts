import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { CommentCommonModule } from '~common/comment';
import { ProductCommonModule } from '~common/product';
import { QuoteCommonModule } from '~common/quote/quote-common.module';
import { SampleCommonModule } from '~common/sample';
import { SupplierCommonModule } from '~common/supplier';
import { TaskCommonModule } from '~common/task';
import { routes } from '~features/products/routes';
import { NavBarModule } from '~shared/navbar';
import { SharedModule } from '~shared/shared.module';

import {
	ProductActivityComponent,
	ProductIconsComponent,
	ProductInformationComponent,
	ProductListComponent,
	ProductSubInfoComponent,
	ProductSummaryComponent,
	ProductTeamRatingComponent,
	ProductTopPanelComponent,
	ProjectCardComponent,
	SelectableImageComponent,
	SelectionActionsComponent,
} from './components';
import {
	ProductDetailsComponent,
	ProductQuotationComponent,
	ProductSamplesComponent,
	ProductShippingComponent,
	ProductsPageComponent,
	ProductTasksComponent,
} from './containers';
import { ProductFeatureService, QuoteFeatureService } from './services';



@NgModule({
	imports: [
		ActivityCommonModule,
		CommentCommonModule,
		CommonModule,
		NavBarModule,
		ProductCommonModule,
		QuoteCommonModule,
		RouterModule.forChild(routes),
		SampleCommonModule,
		SharedModule,
		TaskCommonModule,
		SupplierCommonModule
	],
	declarations: [
		ProductActivityComponent,
		ProductDetailsComponent,
		ProductIconsComponent,
		ProductInformationComponent,
		ProductListComponent,
		ProductQuotationComponent,
		ProductSamplesComponent,
		ProductShippingComponent,
		ProductSubInfoComponent,
		ProductSummaryComponent,
		ProductTasksComponent,
		ProductTeamRatingComponent,
		ProductTopPanelComponent,
		ProductsPageComponent,
		ProjectCardComponent,
		SelectableImageComponent,
		SelectionActionsComponent,
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
