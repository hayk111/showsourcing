import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { CommentCommonModule } from '~common/comment';
import { ProductCommonModule } from '~common/product';
import { QuoteCommonModule } from '~common/quote/quote-common.module';
import { SampleCommonModule } from '~common/sample';
import { TaskCommonModule } from '~common/task';
import { routes } from '~features/products/routes';
import { NavBarModule } from '~shared/navbar';
import { SharedModule } from '~shared/shared.module';

import {
	ProductActivityComponent,
	ProductCardComponent,
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
	ProductResumeComponent,
	ProductSamplesComponent,
	ProductShippingComponent,
	ProductsPageComponent,
	ProductTasksComponent,
} from './containers';
import { ProductFeatureService, QuoteFeatureService } from './services';



@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule,
		ActivityCommonModule,
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
