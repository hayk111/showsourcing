import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { ProductCommonModule } from '~common/product/product-common.module';
import { QuoteCommonModule } from '~common/quote/quote-common.module';
import { SampleCommonModule } from '~common/sample';
import { TaskCommonModule } from '~common/task';
import {
	ProductIconsComponent,
	ProductSubInfoComponent,
	ProjectCardComponent,
	SelectionActionsComponent,
	SupplierCardComponent,
} from '~features/products/components';
import { ProductNavigationComponent } from '~features/products/components/product-navigation/product-navigation.component';
import { ProductSummaryComponent } from '~features/products/components/product-summary/product-summary.component';
import { SelectableImageComponent } from '~features/products/components/selectable-image/selectable-image.component';
import {
	ProductDetailsComponent,
	ProductGeneralInfoComponent,
	ProductQuotationComponent,
	ProductSamplesComponent,
	ProductsPageComponent,
	ProductResumeComponent,
	ProductTasksComponent,
	ProductShippingComponent,
} from '~features/products/containers';
import { routes } from '~features/products/routes';
import { ProductFeatureService, QuoteFeatureService } from '~features/products/services';
import { SharedModule } from '~shared/shared.module';

import { ProductActivityComponent } from './components/product-activity/product-activity.component';
import { ProductCarouselComponent } from './components/product-carousel/product-carousel.component';
import { ProductTeamRatingComponent } from './components/product-team-rating/product-team-rating.component';
import { ProductTopPanelComponent } from './components/product-top-panel/product-top-panel.component';
import { VoteDetailsDialogComponent } from './components/vote-details-dialog/vote-details-dialog.component';


@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule,
		ActivityCommonModule,
		ProductCommonModule,
		ProductCommonModule,
		TaskCommonModule,
		QuoteCommonModule,
		SampleCommonModule
	],
	declarations: [
		ProductIconsComponent,
		ProductSubInfoComponent,
		ProductQuotationComponent,
		ProductsPageComponent,
		SelectionActionsComponent,
		ProductDetailsComponent,
		ProjectCardComponent,
		SupplierCardComponent,
		ProductGeneralInfoComponent,
		ProductSummaryComponent,
		SelectableImageComponent,
		ProductNavigationComponent,
		ProductCarouselComponent,
		ProductTeamRatingComponent,
		ProductActivityComponent,
		VoteDetailsDialogComponent,
		ProductTasksComponent,
		ProductTopPanelComponent,
		ProductSamplesComponent,
		ProductResumeComponent,
		ProductShippingComponent
	],
	entryComponents: [
		VoteDetailsDialogComponent
	],
	exports: [],
	providers: [
		ProductFeatureService,
		QuoteFeatureService
	]
})
export class ProductModule {

}
