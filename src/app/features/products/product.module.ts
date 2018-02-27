import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FileModule } from '~features/file';
import { CardModule } from '~shared/card';
import { EditableFieldModule } from '~shared/editable-field';
import { EntityMainCardModule } from '~shared/entity-main-card';
import { EntityPageModule } from '~shared/entity-page';
import { IconsModule } from '~shared/icons';
import { LikesChartModule } from '~shared/likes-chart';
import { LoadersModule } from '~shared/loaders';
import { PriceModule } from '~shared/price';
import { RatingModule } from '~shared/rating';
import { SelectableImageModule } from '~shared/selectable-image';
import { SelectionBarModule } from '~shared/selection-bar';
import { UtilsModule } from '~shared/utils/utils.module';
import { AppStoreModule } from '~store/store.module';
import { SuppliersModule } from '~suppliers';
import { UserModule } from '~user/user.module';

import {
  ProductCardViewComponent,
  ProductIconsComponent,
  ProductSelectableCardComponent,
  ProductSmallCardComponent,
  ProductStatusBadgeComponent,
  ProductSubInfoComponent,
  ProductTopCardComponent,
	SelectionActionsComponent,
	ProductListViewComponent
} from './components';
import {
  ProductBigCardComponent,
  ProductInfoCardComponent,
  ProductPageComponent,
  ProductSidePreviewComponent,
  ProductsPageComponent,
  ProductTasksComponent,
} from './containers';
import { routes } from './routes';
import { ProductService } from './services/product.service';
import { effects } from './store';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		// StoreModule.forFeature('testEntities', reducers),
		EffectsModule.forFeature(effects),
		NgxDatatableModule,
		LoadersModule,
		EntityMainCardModule,
		LikesChartModule,
		AppStoreModule, // TODO to be removed and placed inside the component module using it
		UserModule.forChild(), // TODO to be removed and placed inside the component module using it
		UtilsModule, // TODO to be removed and placed inside the component module using it
		FileModule.forChild(), // TODO to be removed and placed inside the component module using it
		SuppliersModule.forChild(), // TODO to be removed and placed inside the component module using it
		EditableFieldModule, // TODO to be removed and placed inside the component module using it
		SelectableImageModule, // TODO to be removed and placed inside the component module using it
		IconsModule, // TODO to be removed and placed inside the component module using it
		CardModule, // TODO to be removed and placed inside the component module using it
		PriceModule, // TODO to be removed and placed inside the component module using it
		RatingModule, // TODO to be removed and placed inside the component module using it
		SelectionBarModule,
		EntityPageModule,
	],
	providers: [ProductService],
	declarations: [
		ProductSmallCardComponent,
		ProductIconsComponent,
		ProductTopCardComponent,
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
		ProductPageComponent,
		ProductTasksComponent,
	],
	exports: [ProductSmallCardComponent, ProductTopCardComponent, ProductInfoCardComponent],
})
export class ProductModule {}
