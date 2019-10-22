import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductBoardComponent } from './product-board/product-board.component';
import { SampleBoardComponent } from './sample-board/sample-board.component';
import { SupplierBoardComponent } from './supplier-board/supplier-board.component';


@NgModule({
	imports: [
		CommonModule,
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
