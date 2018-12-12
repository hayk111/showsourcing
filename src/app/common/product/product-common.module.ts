import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListModule } from '~shared/list/list.module';
import { PriceModule } from '~shared/price';
import { SharedModule } from '~shared/shared.module';

import {
	MoqComponent,
	ProductCardComponent,
	ProductGridCardComponent,
	ProductsCardViewComponent,
	ProductsListViewComponent,
	ProductSortingMenuComponent,
	StatsIconsComponent,
} from './components';
import { ProductPreviewComponent } from './containers';



@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
		PriceModule,
		ListModule
	],
	declarations: [
		ProductPreviewComponent,
		ProductsListViewComponent,
		ProductsCardViewComponent,
		ProductGridCardComponent,
		ProductSortingMenuComponent,
		ProductCardComponent,
		MoqComponent,
		StatsIconsComponent
	],
	exports: [
		ProductPreviewComponent,
		ProductsListViewComponent,
		ProductsCardViewComponent,
		ProductGridCardComponent,
		ProductSortingMenuComponent,
		ProductCardComponent,
		MoqComponent,
		StatsIconsComponent
	],
	entryComponents: [],
	providers: []
})
export class ProductCommonModule { }
