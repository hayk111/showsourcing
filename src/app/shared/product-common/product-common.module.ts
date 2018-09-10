import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FindProductsDialogComponent } from '~shared/product-common/containers/find-products-dialog/find-products-dialog.component';
import {
	ProductsCardViewDialogComponent
} from '~shared/product-common/components/products-card-view-dialog/products-card-view-dialog.component';
import { SharedModule } from '~shared/shared.module';
import { DialogModule } from '~shared/dialog/dialog.module';
import { SearchAutocompleteModule } from '~shared/search-autocomplete/search-autocomplete.module';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { TableModule } from '~shared/table/table.module';
import { RatingModule } from '~shared/rating/rating.module';
import { WorkflowActionModule } from '~shared/workflow-action/workflow-action.module';
import { ActionBarModule } from '~shared/action-bar/action-bar.module';
import { StatusModule } from '~shared/status/status.module';
import { FiltersModule } from '~shared/filters';
import { ProductsListViewComponent } from '~shared/product-common/components/products-list-view/products-list-view.component';
import { ProductsCardViewComponent } from '~shared/product-common/components/products-card-view/products-card-view.component';
import { ProductGridCardComponent } from '~shared/product-common/components/product-grid-card/product-grid-card.component';


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
	],
	exports: [
		FindProductsDialogComponent,
		ProductsListViewComponent,
		ProductsCardViewComponent,
		ProductGridCardComponent,
	],
	entryComponents: [FindProductsDialogComponent],
	providers: []
})
export class ProductCommonModule { }
