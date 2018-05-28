import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from '~app-root/pipes';
import { CommentModule } from '~features/comment';
import { ProductMainCardComponent } from '~features/products/components/product-main-card/product-main-card.component';
import { ProductSummaryComponent } from '~features/products/components/product-summary/product-summary.component';
import { SelectableImageComponent } from '~features/products/components/selectable-image/selectable-image.component';
import { ProductService } from '~features/products/services';
import { BadgeModule } from '~shared/badge/badge.module';
import { CarouselModule } from '~shared/carousel';
import { DialogModule } from '~shared/dialog/dialog.module';
import { EntityPagesModule } from '~shared/entity-pages/entity-pages.module';
import { FileModule } from '~shared/file';
import { FiltersModule } from '~shared/filters';
import { RatingModule } from '~shared/rating';
import { SelectionBarModule } from '~shared/selection-bar';
import { SharedModule } from '~shared/shared.module';
import { StatusModule } from '~shared/status/status.module';
import { TableModule } from '~shared/table';

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
import { SelectionService } from './services/selection.service';
import { DynamicFormsModule } from '~shared/dynamic-forms';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([]),
		DynamicFormsModule,
		ReactiveFormsModule,
		PipesModule,
		DialogModule,
		StatusModule,
		FileModule.forChild(), // file card used
		RatingModule, // TODO check if used
		SelectionBarModule, // used for selection bar at the bottom
		TableModule, // used in list
		FiltersModule.forChild(), // used for filters
		CarouselModule,
		BadgeModule,
		CommentModule.forChild(),
		EntityPagesModule,
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
		ProductMainCardComponent
	],
	entryComponents: [
		ProductRequestTeamFeedbackDlgComponent,
		ProductExportDlgComponent,
		ProductAddToProjectDlgComponent,
		NewProductDialogComponent
	],
	exports: [ProductSmallCardComponent],
	providers: [ProductService, SelectionService]
})
export class ProductModule {

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ProductModule,
			providers: [],
		};
	}

}
