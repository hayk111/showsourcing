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

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
		PriceModule,
		ListModule
	],
	declarations: [

	],
	exports: [

	],
	entryComponents: [],
	providers: []
})
export class ProductElementModule { }
