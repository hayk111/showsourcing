import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommentModule } from '~features/comment';
import { ProductSummaryComponent } from '~features/products/components/product-summary/product-summary.component';
import { SelectableImageComponent } from '~features/products/components/selectable-image/selectable-image.component';
import { GroupByPipe } from '~features/products/pipes/groupby';
import { ProductFeatureService } from '~features/products/services';
import { BadgeModule } from '~shared/badge/badge.module';
import { CarouselModule } from '~shared/carousel';
import { DialogModule } from '~shared/dialog/dialog.module';
import { DynamicFormsModule } from '~shared/dynamic-forms';
import { FileModule } from '~shared/file';
import { FiltersModule } from '~shared/filters';
import { RatingModule } from '~shared/rating';
import { SelectionBarModule } from '~shared/selection-bar';
import { SharedModule } from '~shared/shared.module';
import { TableModule } from '~shared/table';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { routes } from '~features/products/routes';

import {
	ProductCardViewComponent,
	ProductIconsComponent,
	ProductListViewComponent,
	ProductSmallCardComponent,
	ProductSubInfoComponent,
	ProjectCardComponent,
	SelectionActionsComponent,
	SupplierCardComponent,
	RfqDialogComponent,
	EmailListComponent
} from '~features/products/components';
import { NewProductDialogComponent } from '~features/products/components/new-product-dialog/new-product-dialog.component';
import { ProductDetailsComponent, ProductGeneralInfoComponent, ProductsPageComponent } from '~features/products/containers';
import { ProductPreviewComponent } from '~features/products/components/product-preview/product-preview.component';
import { ProductNavigationComponent } from '~features/products/components/product-navigation/product-navigation.component';
import { WorkflowActionModule } from '~shared/workflow-action/workflow-action.module';
import { StageIndicatorModule } from '~shared/stage-indicator/stage-indicator.module';
import { ProductGridCardComponent } from './components/product-grid-card/product-grid-card.component';
import { ActionBarModule } from '~shared/action-bar/action-bar.module';
import { CustomDialogModule } from '~shared/custom-dialog';

import { TeamRatingCardComponent } from './components/team-rating-card/team-rating-card.component';
import { ProductCarouselComponent } from './components/product-carousel/product-carousel.component';
import { ActivityUserComponent } from '~shared/activity/components/activity-user/activity-user.component';
import { ProductTeamRatingComponent } from './components/product-team-rating/product-team-rating.component';
import { ProductActivityComponent } from './components/product-activity/product-activity.component';
import { ActivityModule } from '~shared/activity/activity.module';
import { StatusModule } from '~shared/status/status.module';
import { VoteDetailsDialogComponent } from './components/vote-details-dialog/vote-details-dialog.component';

@NgModule({
	imports: [
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
		CommentModule,
		TopPanelModule,
		SearchAutocompleteModule,
		WorkflowActionModule,
		StageIndicatorModule,
		ActionBarModule,
		CustomDialogModule,
		ActivityModule,
		StatusModule
	],
	declarations: [
		ProductSmallCardComponent,
		ProductIconsComponent,
		ProductSubInfoComponent,
		ProductsPageComponent,
		ProductListViewComponent,
		ProductCardViewComponent,
		SelectionActionsComponent,
		ProductDetailsComponent,
		ProjectCardComponent,
		SupplierCardComponent,
		ProductGeneralInfoComponent,
		ProductSummaryComponent,
		SelectableImageComponent,
		NewProductDialogComponent,
		GroupByPipe,
		ProductPreviewComponent,
		ProductNavigationComponent,
		RfqDialogComponent,
		EmailListComponent,
		TeamRatingCardComponent,
		ProductGridCardComponent,
		ProductCarouselComponent,
		ProductTeamRatingComponent,
		ProductActivityComponent,
		VoteDetailsDialogComponent
	],
	entryComponents: [
		NewProductDialogComponent,
		RfqDialogComponent,
		VoteDetailsDialogComponent
	],
	exports: [ProductSmallCardComponent],
	providers: [ProductFeatureService]
})
export class ProductModule {

}
