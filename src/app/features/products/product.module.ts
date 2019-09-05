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
	ProductIconsComponent,
	ProductInformationComponent,
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
	ProductSamplesComponent,
	ProductShippingComponent,
	ProductsPageComponent,
	ProductTasksComponent,
} from './containers';
import { ProductRequestsComponent } from './containers/product-requests/product-requests.component';
import { ProductFeatureService, QuoteFeatureService } from './services';
import { ProductActivityNavComponent } from './components/product-activity/product-activity-nav/product-activity-nav.component';



@NgModule({
	imports: [
		ActivityCommonModule,
		CommentCommonModule,
		CommonModule,
		NavBarModule,
		ProductCommonModule,
		RequestCommonModule,
		RouterModule.forChild(routes),
		SampleCommonModule,
		SharedModule,
		SupplierCommonModule,
		TaskCommonModule,
	],
	declarations: [
		ProductActivityComponent,
		ProductDetailsComponent,
		ProductIconsComponent,
		ProductInformationComponent,
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
		ProductRequestsComponent,
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
