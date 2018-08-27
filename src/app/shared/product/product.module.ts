import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindProductsDialogComponent } from '~shared/product/containers/find-products-dialog/find-products-dialog.component';
import { ProductsCardViewComponent } from '~shared/product/components/products-card-view/products-card-view.component';
import { SharedModule } from '~shared/shared.module';
import { DialogModule } from '~shared/dialog/dialog.module';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { ProductFeatureService } from '~shared/product/services/product-feature.service';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		DialogModule,
		SearchAutocompleteModule,
		TopPanelModule
	],
	declarations: [FindProductsDialogComponent, ProductsCardViewComponent],
	exports: [FindProductsDialogComponent],
	entryComponents: [FindProductsDialogComponent],
	providers: [ProductFeatureService]
})
export class ProductModule { }
