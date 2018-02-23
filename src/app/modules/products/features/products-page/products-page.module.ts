import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductModule } from '@modules/products';
import { EntityPageModule } from '@shared/entity-page/entity-page.module';
import { IconsModule } from '@shared/icons/icons.module';
import { PriceModule } from '@shared/price/price.module';
import { SelectionBarModule } from '@shared/selection-bar/selection-bar.module';
import { UtilsModule } from '@shared/utils/utils.module';
import { AppStoreModule } from '@store/store.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ProductDetailsPageModule } from '../product-details/product-details-page.module';
import { ProductCardViewComponent } from './components/product-card-view/product-card-view.component';
import { SelectionActionsComponent } from './components/selection-actions/selection-actions.component';
import { ProductListViewComponent, ProductSidePreviewComponent, ProductsPageComponent } from './containers';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild([]),
		AppStoreModule.forChild(),
		ProductDetailsPageModule,
		UtilsModule,
		NgxDatatableModule,
		PriceModule,
		EntityPageModule,
		IconsModule,
		SelectionBarModule,
		ProductModule,
	],
	declarations: [
		ProductsPageComponent,
		ProductListViewComponent,
		ProductCardViewComponent,
		ProductSidePreviewComponent,
		SelectionActionsComponent,
	],
})
export class ProductsPageModule {}
