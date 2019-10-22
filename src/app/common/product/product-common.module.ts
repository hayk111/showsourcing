import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommentCommonModule } from '~common/comment';
import { SharedModule } from '~shared/shared.module';

import {
	MoqComponent,
	ProductBoardComponent,
	ProductCardActivitiesComponent,
	ProductCardComponent,
	ProductGridCardComponent,
	ProductResumeComponent,
	ProductsCardViewComponent,
	ProductSelectionBarComponent,
	ProductsTableComponent,
	ProductSortingMenuComponent,
	StatsIconsComponent,
} from './components';
import { ProductPreviewComponent } from './containers';
import { SampleCommonModule } from '~common/sample/sample-common.module';

@NgModule({
	imports: [
		RouterModule,
		SharedModule,
		CommentCommonModule,
		SampleCommonModule
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
		ProductsTableComponent,
		ProductCardActivitiesComponent,
		StatsIconsComponent,
	],
	exports: [
		MoqComponent,
		ProductCardComponent,
		ProductBoardComponent,
		ProductGridCardComponent,
		ProductCardActivitiesComponent,
		ProductPreviewComponent,
		ProductResumeComponent,
		ProductSelectionBarComponent,
		ProductSortingMenuComponent,
		ProductsCardViewComponent,
		ProductsTableComponent,
		StatsIconsComponent,
	],
	entryComponents: [],
	providers: []
})
export class ProductCommonModule { }
