import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { PipesModule } from '~app/app-root/pipes';
import { CommentModule } from '~app/features/comment';
import { SelectableImageComponent } from '~app/features/products/components/selectable-image/selectable-image.component';
import { SuppliersModule } from '~app/features/supplier';
import { UserModule } from '~app/features/user';
import { BadgeModule } from '~app/shared/badge/badge.module';
import { CarouselModule } from '~app/shared/carousel';
import { EntityPagesModule } from '~app/shared/entity-pages/entity-pages.module';
import { FileModule } from '~app/shared/file';
import { FiltersModule } from '~app/shared/filters';
import { InputsModule } from '~app/shared/inputs';
import { StatusModule } from '~app/shared/status/status.module';
import { TableModule } from '~app/shared/table';
import { DialogModule } from '~dialog/dialog.module';
import { EntityModule } from '~entity';
import { ProductEffects } from '~product';
import { CardModule } from '~shared/card';
import { EditableFieldModule } from '~shared/editable-field';
import { IconsModule } from '~shared/icons';
import { LoadersModule } from '~shared/loaders';
import { PriceModule } from '~shared/price';
import { RatingModule } from '~shared/rating';
import { SelectionBarModule } from '~shared/selection-bar';
import { UtilsModule } from '~shared/utils/utils.module';

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
import { ProductTopBarComponent } from './components/product-top-bar/product-top-bar.component';
import {
	ProductDetailsComponent,
	ProductGeneralInfoComponent,
	ProductsPageComponent,
} from './containers';
import { routes } from './routes';
import { SharedModule } from '~app/shared/shared.module';
import { ProductAddToProjectDlgComponent } from './components/product-add-to-project-dlg/product-add-to-project-dlg.component';
import {
	ProductRequestTeamFeedbackDlgComponent
} from './components/product-request-team-feedback-dlg/product-request-team-feedback-dlg.component';

import { ProductExportDlgComponent } from './components/product-export-dlg/product-export-dlg.component';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';
import { NewProductDialogComponent } from './components/new-product-dialog/new-product-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([]),
		ReactiveFormsModule,
		PipesModule,
		DialogModule,
		EffectsModule.forFeature([ProductEffects]),
		StatusModule.forChild(),
		FileModule.forChild(), // file card used
		RatingModule, // TODO to be removed and placed inside the component module using it
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
		ProductTopBarComponent,
		SelectableImageComponent,
		ProductAddToProjectDlgComponent,
		ProductRequestTeamFeedbackDlgComponent,
		ProductExportDlgComponent,
		ProductFiltersComponent,
		NewProductDialogComponent
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
