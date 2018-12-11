import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';
import { PriceModule } from '~shared/price';
import { ListModule } from '~shared/list/list.module';

import {
	MoqComponent,
	ProductCardComponent,
	ProductGridCardComponent,
	ProductsCardViewComponent,
	ProductsCardViewDialogComponent,
	ProductsListViewComponent,
	ProductSortingMenuComponent,
	StatsIconsComponent,
} from './components';
import { FindProductsDialogComponent } from './containers/find-products-dialog/find-products-dialog.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
		PriceModule,
		ListModule
	],
	declarations: [
		FindProductsDialogComponent,
		ProductsCardViewDialogComponent,
		ProductsListViewComponent,
		ProductsCardViewComponent,
		ProductGridCardComponent,
		ProductSortingMenuComponent,
		ProductCardComponent,
		MoqComponent,
		StatsIconsComponent
	],
	exports: [
		FindProductsDialogComponent,
		ProductsListViewComponent,
		ProductsCardViewComponent,
		ProductGridCardComponent,
		ProductSortingMenuComponent,
		ProductCardComponent,
		MoqComponent,
		StatsIconsComponent
	],
	entryComponents: [FindProductsDialogComponent],
	providers: []
})
export class ProductElementModule { }
