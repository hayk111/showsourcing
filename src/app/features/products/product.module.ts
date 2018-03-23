import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { PipesModule } from '~app/app-root/pipes';
import { BadgeModule } from '~app/shared/badge/badge.module';
import { CarouselModule } from '~app/shared/carousel';
import { FiltersModule } from '~app/shared/filters';
import { InputsModule } from '~app/shared/inputs';
import { TableModule } from '~app/shared/table';
import { DialogModule } from '~dialog/dialog.module';
import { EntityModule } from '~entity';
import { FileModule } from '~features/file';
import { CardModule } from '~shared/card';
import { EditableFieldModule } from '~shared/editable-field';
import { IconsModule } from '~shared/icons';
import { LikesChartModule } from '~shared/likes-chart';
import { LoadersModule } from '~shared/loaders';
import { PriceModule } from '~shared/price';
import { RatingModule } from '~shared/rating';
import { SelectableImageModule } from '~shared/selectable-image';
import { SelectionBarModule } from '~shared/selection-bar';
import { UtilsModule } from '~shared/utils/utils.module';
import { SuppliersModule } from '~suppliers';
import { UserModule } from '~user/user.module';

import {
	CellOneRowComponent,
	CellTwoRowComponent,
	ProductActionDialogComponent,
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
import {
	ProductBigCardComponent,
	ProductGeneralInfoComponent,
	ProductInfoCardComponent,
	ProductDetailsComponent,
	ProductSidePreviewComponent,
	ProductsPageComponent,
	ProductTasksComponent,
} from './containers';
import { routes } from './routes';
import { ProductService } from './services/product.service';
import { ProductEffects } from './store/product.effects';
import { ProductTopBarComponent } from './components/product-top-bar/product-top-bar.component';
import { CommentModule } from '~app/features/comment';
import { EntityPagesModule } from '~app/shared/entity-pages/entity-pages.module';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		PipesModule,
		DialogModule,
		EffectsModule.forFeature([ProductEffects]),
		LoadersModule,
		EntityModule.forChild(),
		UserModule.forChild(), // TODO to be removed and placed inside the component module using it
		UtilsModule, // TODO to be removed and placed inside the component module using it
		FileModule.forChild(), // file card used
		SuppliersModule.forChild(), // TODO to be removed and placed inside the component module using it
		EditableFieldModule, // TODO to be removed and placed inside the component module using it
		SelectableImageModule, // TODO to be removed and placed inside the component module using it
		IconsModule, // TODO to be removed and placed inside the component module using it
		CardModule, // TODO to be removed and placed inside the component module using it
		PriceModule, // TODO to be removed and placed inside the component module using it
		RatingModule, // TODO to be removed and placed inside the component module using it
		SelectionBarModule, // could move into EntityPageModule ?
		TableModule, // used in list
		FiltersModule, // used for filters
		CarouselModule,
		BadgeModule,
		InputsModule, // checkbox
		CommentModule.forChild(),
		EntityPagesModule,
	],
	providers: [ProductService],
	declarations: [
		CellOneRowComponent,
		CellTwoRowComponent,
		ProductActionDialogComponent,
		ProductSmallCardComponent,
		ProductIconsComponent,
		ProductInfoCardComponent,
		ProductStatusBadgeComponent,
		ProductSubInfoComponent,
		ProductsPageComponent,
		ProductListViewComponent,
		ProductCardViewComponent,
		ProductSidePreviewComponent,
		ProductSelectableCardComponent,
		SelectionActionsComponent,
		ProductBigCardComponent,
		ProductDetailsComponent,
		ProductTasksComponent,
		ProjectCardComponent,
		SupplierCardComponent,
		ProductGeneralInfoComponent,
		ProductTopBarComponent,
	],
	exports: [ProductSmallCardComponent, ProductInfoCardComponent],
})
export class ProductModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: ProductModule,
			providers: [ProductService],
		};
	}
}
