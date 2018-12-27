import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommentCommonModule } from '~common/comment';
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
		CommentCommonModule
	],
	declarations: [
		ProductPreviewComponent,
		ProductsListViewComponent,
		ProductsCardViewComponent,
		ProductSortingMenuComponent,
		ProductCardComponent,
		MoqComponent,
		StatsIconsComponent,
		ProductGridCardComponent
	],
	exports: [
		ProductPreviewComponent,
		ProductsListViewComponent,
		ProductsCardViewComponent,
		ProductSortingMenuComponent,
		ProductCardComponent,
		MoqComponent,
		StatsIconsComponent,
		ProductGridCardComponent
	],
	entryComponents: [],
	providers: []
})
export class ProductCommonModule { }
