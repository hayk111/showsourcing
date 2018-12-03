import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';

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
import { FindProductsDialogComponent, ProductPreviewComponent, PriceWithQuantityComponent, ListActionButtonsComponent } from './containers';



@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
	],
	declarations: [
		FindProductsDialogComponent,
		ProductsCardViewDialogComponent,
		ProductsListViewComponent,
		ProductsCardViewComponent,
		ProductGridCardComponent,
		ProductSortingMenuComponent,
		ProductPreviewComponent,
		PriceWithQuantityComponent,
		ListActionButtonsComponent,
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
		ProductPreviewComponent,
		PriceWithQuantityComponent,
		ListActionButtonsComponent,
		ProductCardComponent,
		MoqComponent,
		StatsIconsComponent
	],
	entryComponents: [FindProductsDialogComponent],
	providers: []
})
export class ProductCommonModule { }
