import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FindProductsDialogComponent } from '~shared/product/containers/find-products-dialog/find-products-dialog.component';
import { ProductsCardViewDialogComponent } from '~shared/product/components/products-card-view-dialog/products-card-view-dialog.component';
import { SharedModule } from '~shared/shared.module';
import { DialogModule } from '~shared/dialog/dialog.module';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { TableModule } from '~shared/table/table.module';
import { RatingModule } from '~shared/rating/rating.module';
import { WorkflowActionModule } from '~shared/workflow-action/workflow-action.module';
import { ActionBarModule } from '~shared/action-bar/action-bar.module';
import { StatusModule } from '~shared/status/status.module';
import { ProductFeatureService } from '~shared/product/services/product-feature.service';
import { ProductsListViewComponent } from '~shared/product/components/products-list-view/products-list-view.component';
import { ProductsCardViewComponent } from '~shared/product/components/products-card-view/products-card-view.component';
import { ProductGridCardComponent } from '~shared/product/components/product-grid-card/product-grid-card.component';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';
import { FiltersModule } from '~shared/filters';


@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
		DialogModule,
		SearchAutocompleteModule,
		TopPanelModule,
		TableModule,
		RatingModule,
		WorkflowActionModule,
		ActionBarModule,
		StatusModule,
		FiltersModule
	],
	declarations: [
		FindProductsDialogComponent,
		ProductsCardViewDialogComponent,
		ProductsListViewComponent,
		ProductsCardViewComponent,
		ProductGridCardComponent,
		ProductFiltersComponent
	],
	exports: [
		FindProductsDialogComponent,
		ProductsListViewComponent,
		ProductsCardViewComponent,
		ProductGridCardComponent,
		ProductFiltersComponent
	],
	entryComponents: [FindProductsDialogComponent],
	providers: [ProductFeatureService]
})
export class ProductCommonModule { }
