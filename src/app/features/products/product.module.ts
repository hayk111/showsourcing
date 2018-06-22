import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommentModule } from '~features/comment';
import { ProductSummaryComponent } from '~features/products/components/product-summary/product-summary.component';
import { SelectableImageComponent } from '~features/products/components/selectable-image/selectable-image.component';
import { GroupByPipe } from '~features/products/pipes/groupby';
import { ProductFeatureService, ProjectService, TeamService, ExportService } from '~features/products/services';
import { BadgeModule } from '~shared/badge/badge.module';
import { CarouselModule } from '~shared/carousel';
import { DialogModule } from '~shared/dialog/dialog.module';
import { DynamicFormsModule } from '~shared/dynamic-forms';
import { FileModule } from '~shared/file';
import { FiltersModule } from '~shared/filters';
import { RatingModule } from '~shared/rating';
import { SelectionBarModule } from '~shared/selection-bar';
import { SharedModule } from '~shared/shared.module';
import { StatusModule } from '~shared/status/status.module';
import { TableModule } from '~shared/table';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';

import {
	ProductCardViewComponent,
	ProductIconsComponent,
	ProductListViewComponent,
	ProductSelectableCardComponent,
	ProductSmallCardComponent,
	ProductSubInfoComponent,
	ProjectCardComponent,
	SelectionActionsComponent,
	SupplierCardComponent,
} from './components';
import { NewProductDialogComponent } from './components/new-product-dialog/new-product-dialog.component';
import {
	ProductAddToProjectDlgComponent,
} from './components/product-add-to-project-dlg/product-add-to-project-dlg.component';
import { ProductExportDlgComponent } from './components/product-export-dlg/product-export-dlg.component';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';
import {
	ProductRequestTeamFeedbackDlgComponent,
} from './components/product-request-team-feedback-dlg/product-request-team-feedback-dlg.component';
import { ProductDetailsComponent, ProductGeneralInfoComponent, ProductsPageComponent } from './containers';
import { FilterDataService } from './services/filter.data.service';
import { SelectionService } from './services/selection.service';
import { ProductPreviewComponent } from './components/product-preview/product-preview.component';
import { ProductNavigationComponent } from './components/product-navigation/product-navigation.component';


@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([]),
		DynamicFormsModule,
		ReactiveFormsModule,
		DialogModule,
		StatusModule,
		FileModule, // file card used
		RatingModule, // TODO check if used
		SelectionBarModule, // used for selection bar at the bottom
		TableModule, // used in list
		FiltersModule.forChild(), // used for filters
		CarouselModule,
		BadgeModule,
		CommentModule.forChild(),
		TopPanelModule,
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
		ProductFiltersComponent,
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
	providers: [ProductFeatureService, ProjectService, TeamService, ExportService, SelectionService, FilterDataService]
})
export class ProductModule {

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ProductModule,
			providers: [],
		};
	}

}
