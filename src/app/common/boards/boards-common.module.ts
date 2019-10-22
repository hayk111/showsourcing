import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';

import { ProductBoardComponent } from './product-board/product-board.component';
import { SampleBoardComponent } from './sample-board/sample-board.component';
import { SupplierBoardComponent } from './supplier-board/supplier-board.component';
import { CardsCommonModule } from '~common/cards/cards-common.module';


@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		CardsCommonModule
	],
	declarations: [
		ProductBoardComponent,
		SampleBoardComponent,
		SupplierBoardComponent,
	],
	exports: [
		ProductBoardComponent,
		SampleBoardComponent,
		SupplierBoardComponent,
	],
	entryComponents: []
})
export class BoardsCommonModule { }
