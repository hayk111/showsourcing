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
	ProductSelectableCardComponent,
	ProductSmallCardComponent,
	ProductSubInfoComponent,
	ProjectCardComponent,
	SelectionActionsComponent,
	SupplierCardComponent
} from '~features/products/components';
import { NewProductDialogComponent } from '~features/products/components/new-product-dialog/new-product-dialog.component';
import {
	ProductAddToProjectDlgComponent,
} from '~features/products/components/product-add-to-project-dlg/product-add-to-project-dlg.component';
import { ProductExportDlgComponent } from '~features/products/components/product-export-dlg/product-export-dlg.component';
import {
	ProductRequestTeamFeedbackDlgComponent,
} from '~features/products/components/product-request-team-feedback-dlg/product-request-team-feedback-dlg.component';
import { ProductDetailsComponent, ProductGeneralInfoComponent, ProductsPageComponent } from '~features/products/containers';
import { ProductPreviewComponent } from '~features/products/components/product-preview/product-preview.component';
import { ProductNavigationComponent } from '~features/products/components/product-navigation/product-navigation.component';
import { WorkflowActionModule } from '~shared/workflow-action/workflow-action.module';


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
		WorkflowActionModule
	],
	declarations: [
		ProductSmallCardComponent,
		ProductIconsComponent,
		ProductSubInfoComponent,
		ProductsPageComponent,
		ProductListViewComponent,
		ProductCardViewComponent,
		ProductSelectableCardComponent,
		SelectionActionsComponent,
		ProductDetailsComponent,
		ProjectCardComponent,
		SupplierCardComponent,
		ProductGeneralInfoComponent,
		ProductSummaryComponent,
		SelectableImageComponent,
		ProductAddToProjectDlgComponent,
		ProductRequestTeamFeedbackDlgComponent,
		ProductExportDlgComponent,
		NewProductDialogComponent,
		GroupByPipe,
		ProductPreviewComponent,
		ProductNavigationComponent
	],
	entryComponents: [
		ProductRequestTeamFeedbackDlgComponent,
		ProductExportDlgComponent,
		ProductAddToProjectDlgComponent,
		NewProductDialogComponent
	],
	exports: [ProductSmallCardComponent],
})
export class ProductModule {

}
