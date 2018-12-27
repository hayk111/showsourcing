import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommentCommonModule } from '~common/comment';
import { SharedModule } from '~shared/shared.module';

import {
	MoqComponent,
	ProductCardComponent,
	ProductGridCard2Component,
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
		CommentCommonModule
	],
	declarations: [
		ProductPreviewComponent,
		ProductsListViewComponent,
		ProductsCardViewComponent,
		ProductGridCardComponent,
		ProductSortingMenuComponent,
		ProductCardComponent,
		MoqComponent,
		StatsIconsComponent,
		ProductGridCard2Component
	],
	exports: [
		ProductPreviewComponent,
		ProductsListViewComponent,
		ProductsCardViewComponent,
		ProductGridCardComponent,
		ProductSortingMenuComponent,
		ProductCardComponent,
		MoqComponent,
		StatsIconsComponent,
		ProductGridCard2Component
	],
	entryComponents: [],
	providers: []
})
export class ProductCommonModule { }
