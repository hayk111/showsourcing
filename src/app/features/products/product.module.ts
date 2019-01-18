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
	ProductListComponent,
	ProductInformationComponent
} from '~features/products/components';
import { ProductSummaryComponent } from '~features/products/components/product-summary/product-summary.component';
import { SelectableImageComponent } from '~features/products/components/selectable-image/selectable-image.component';
import {
	ProductDetailsComponent,
	ProductQuotationComponent,
	ProductSamplesComponent,
	ProductsPageComponent,
	ProductResumeComponent,
	ProductShippingComponent,
	ProductTasksComponent
} from '~features/products/containers';
import { routes } from '~features/products/routes';
import { ProductFeatureService, QuoteFeatureService } from '~features/products/services';
import { SharedModule } from '~shared/shared.module';

import { ProductActivityComponent } from './components/product-activity/product-activity.component';
import { ProductTeamRatingComponent } from './components/product-team-rating/product-team-rating.component';
import { ProductTopPanelComponent } from './components/product-top-panel/product-top-panel.component';
import { CommentCommonModule } from '~common/comment/comment-common.module';
import { NavBarModule } from '~shared/navbar/navbar.module';


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
		CommentCommonModule,
		NavBarModule,
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
		ProductSummaryComponent,
		SelectableImageComponent,
		ProductTeamRatingComponent,
		ProductActivityComponent,
		ProductTasksComponent,
		ProductTopPanelComponent,
		ProductListComponent,
		ProductSamplesComponent,
		ProductResumeComponent,
		ProductInformationComponent,
		ProductShippingComponent,
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
