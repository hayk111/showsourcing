import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { ProductCommonModule } from '~common/product/product-common.module';
import { QuoteCommonModule } from '~common/quote/quote-common.module';
import { SampleCommonModule } from '~common/sample';
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
} from '~features/products/containers';
import { routes } from '~features/products/routes';
import { ProductFeatureService, QuoteFeatureService } from '~features/products/services';
import { ActionBarModule } from '~shared/action-bar/action-bar.module';
import { BadgeModule } from '~shared/badge/badge.module';
import { CarouselModule } from '~shared/carousel';
import { DialogCommonModule } from '~common/dialog';
import { DialogModule } from '~shared/dialog/dialog.module';
import { DynamicFormsModule } from '~shared/dynamic-forms';
import { FileModule } from '~shared/file';
import { FiltersModule } from '~shared/filters';
import { InputsCustomModule } from '~shared/inputs-custom/inputs-custom.module';
import { RatingModule } from '~shared/rating';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { SelectionBarModule } from '~shared/selection-bar';
import { SharedModule } from '~shared/shared.module';
import { StageIndicatorModule } from '~shared/stage-indicator/stage-indicator.module';
import { TableModule } from '~shared/table';
import { TaskCommonModule } from '~common/task';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { UtilsModule } from '~shared/utils';
import { StatusSelectorModule } from '~shared/status-selector/status-selector.module';

import { ProductActivityComponent } from './components/product-activity/product-activity.component';
import { ProductCarouselComponent } from './components/product-carousel/product-carousel.component';
import { ProductTeamRatingComponent } from './components/product-team-rating/product-team-rating.component';
import { ProductTopPanelComponent } from './components/product-top-panel/product-top-panel.component';
import { VoteDetailsDialogComponent } from './components/vote-details-dialog/vote-details-dialog.component';
import { ProductTasksComponent } from './containers/product-tasks/product-tasks.component';


@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule,
		DialogCommonModule,
		ActivityCommonModule,
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
		ProductSamplesComponent
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
