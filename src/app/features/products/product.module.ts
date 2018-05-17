import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from '~app/app-root/pipes';
import { CommentModule } from '~app/features/comment';
import { ProductMainCardComponent } from '~app/features/products/components/product-main-card/product-main-card.component';
import { ProductSummaryComponent } from '~app/features/products/components/product-summary/product-summary.component';
import { SelectableImageComponent } from '~app/features/products/components/selectable-image/selectable-image.component';
import { BadgeModule } from '~app/shared/badge/badge.module';
import { CarouselModule } from '~app/shared/carousel';
import { EntityPagesModule } from '~app/shared/entity-pages/entity-pages.module';
import { FileModule } from '~app/shared/file';
import { FiltersModule } from '~app/shared/filters';
import { SharedModule } from '~app/shared/shared.module';
import { StatusModule } from '~app/shared/status/status.module';
import { TableModule } from '~app/shared/table';
import { DialogModule } from '~shared/dialog/dialog.module';
import { RatingModule } from '~shared/rating';
import { SelectionBarModule } from '~shared/selection-bar';

import {
	ProductCardViewComponent,
	ProductIconsComponent,
	ProductListViewComponent,
	ProductSelectableCardComponent,
	ProductSmallCardComponent,
	ProductStatusBadgeComponent,
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

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([]),

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
	providers: [],
	declarations: [
		ProductSmallCardComponent,
		ProductIconsComponent,
		ProductStatusBadgeComponent,
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
})
export class ProductModule {

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ProductModule,
			providers: [],
		};
	}

}
