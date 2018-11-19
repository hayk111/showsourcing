import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
	ProductIconsComponent,
	ProductSubInfoComponent,
	ProjectCardComponent,
	SelectionActionsComponent,
	SupplierCardComponent,
} from '~features/products/components';
import { NewProductDialogComponent } from '~features/products/components/new-product-dialog/new-product-dialog.component';
import { ProductNavigationComponent } from '~features/products/components/product-navigation/product-navigation.component';
import { ProductSummaryComponent } from '~features/products/components/product-summary/product-summary.component';
import { SelectableImageComponent } from '~features/products/components/selectable-image/selectable-image.component';
import {
	ProductDetailsComponent,
	ProductGeneralInfoComponent,
	ProductsPageComponent,
	ProductQuotationComponent
} from '~features/products/containers';
import { routes } from '~features/products/routes';
import { ProductFeatureService, QuoteFeatureService } from '~features/products/services';
import { ActionBarModule } from '~shared/action-bar/action-bar.module';
import { ActivityModule } from '~shared/activity/activity.module';
import { BadgeModule } from '~shared/badge/badge.module';
import { CarouselModule } from '~shared/carousel';
import { CustomDialogModule } from '~shared/custom-dialog';
import { DialogModule } from '~shared/dialog/dialog.module';
import { DynamicFormsModule } from '~shared/dynamic-forms';
import { FileModule } from '~shared/file';
import { FiltersModule } from '~shared/filters';
import { InputsCustomModule } from '~shared/inputs-custom/inputs-custom.module';
import { ProductCommonModule } from '~shared/product-common/product-common.module';
import { RatingModule } from '~shared/rating';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { SelectionBarModule } from '~shared/selection-bar';
import { SharedModule } from '~shared/shared.module';
import { StageIndicatorModule } from '~shared/stage-indicator/stage-indicator.module';
import { StatusModule } from '~shared/status/status.module';
import { TableModule } from '~shared/table';
import { TaskCommonModule } from '~shared/task-common';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { UtilsModule } from '~shared/utils';
import { WorkflowActionModule } from '~shared/workflow-action/workflow-action.module';
import { QuoteCommonModule } from '~shared/quote/quote.module';

import { ProductActivityComponent } from './components/product-activity/product-activity.component';
import { ProductCarouselComponent } from './components/product-carousel/product-carousel.component';
import { ProductTeamRatingComponent } from './components/product-team-rating/product-team-rating.component';
import { ProductTopPanelComponent } from './components/product-top-panel/product-top-panel.component';
import { VoteDetailsDialogComponent } from './components/vote-details-dialog/vote-details-dialog.component';
import { ListPageViewService } from '~shared/list-page/list-page-view.service';
import { ProductTasksComponent } from './containers/product-tasks/product-tasks.component';
import { ERM_TOKEN, ERM } from '~models';
import { CommonDialogService } from '~shared/custom-dialog/services/common-dialog.service';
import { ListPageDataService } from '~shared/list-page/list-page-data.service';
import { SelectionWithFavoriteService } from '~shared/list-page/selection-with-favorite.service';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		RouterModule.forChild(routes),
		DynamicFormsModule,
		ReactiveFormsModule,
		DialogModule,
		FileModule, // file card used
		RatingModule,
		SelectionBarModule, // used for selection bar at the bottom
		TableModule, // used in list
		FiltersModule, // used for filters
		CarouselModule,
		BadgeModule,
		TopPanelModule,
		SearchAutocompleteModule,
		WorkflowActionModule,
		StageIndicatorModule,
		ActionBarModule,
		CustomDialogModule,
		ActivityModule,
		StatusModule,
		ProductCommonModule,
		UtilsModule,
		TaskCommonModule,
		QuoteCommonModule,
		InputsCustomModule
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
		NewProductDialogComponent,
		ProductNavigationComponent,
		ProductCarouselComponent,
		ProductTeamRatingComponent,
		ProductActivityComponent,
		VoteDetailsDialogComponent,
		ProductTasksComponent,
		ProductTopPanelComponent
	],
	entryComponents: [
		NewProductDialogComponent,
		VoteDetailsDialogComponent
	],
	exports: [],
	providers: [
		ProductFeatureService,
		QuoteFeatureService,
		ListPageViewService,
		ListPageDataService,
		SelectionWithFavoriteService,
		CommonDialogService,
		{ provide: ERM_TOKEN, useValue: ERM.PRODUCT },
	]
})
export class ProductModule {

}
