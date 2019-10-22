import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommentCommonModule } from '~common/comment';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { SharedModule } from '~shared/shared.module';

import {
	MoqComponent,
	ProductCardActivitiesComponent,
	ProductGridCardComponent,
	ProductsCardViewComponent,
} from './components';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
		CommentCommonModule,
		TablesCommonModule
	],
	declarations: [
		MoqComponent,
		ProductGridCardComponent,
		ProductsCardViewComponent,
		ProductCardActivitiesComponent,
	],
	exports: [
		MoqComponent,
		ProductGridCardComponent,
		ProductCardActivitiesComponent,
		ProductsCardViewComponent,
	],
	entryComponents: [],
	providers: []
})
export class ProductCommonModule { }
