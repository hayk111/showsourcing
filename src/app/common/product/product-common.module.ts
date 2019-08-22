import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommentCommonModule } from '~common/comment';
import { SharedModule } from '~shared/shared.module';

import {
	MoqComponent,
	ProductCardComponent,
	ProductBoardComponent,
	ProductGridCardComponent,
	ProductResumeComponent,
	ProductsCardViewComponent,
	ProductSelectionBarComponent,
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
		MoqComponent,
		ProductCardComponent,
		ProductBoardComponent,
		ProductGridCardComponent,
		ProductPreviewComponent,
		ProductResumeComponent,
		ProductSelectionBarComponent,
		ProductSortingMenuComponent,
		ProductsCardViewComponent,
		ProductsListViewComponent,
		StatsIconsComponent,
	],
	exports: [
		MoqComponent,
		ProductCardComponent,
		ProductBoardComponent,
		ProductGridCardComponent,
		ProductPreviewComponent,
		ProductResumeComponent,
		ProductSelectionBarComponent,
		ProductSortingMenuComponent,
		ProductsCardViewComponent,
		ProductsListViewComponent,
		StatsIconsComponent,
	],
	entryComponents: [],
	providers: []
})
export class ProductCommonModule { }
