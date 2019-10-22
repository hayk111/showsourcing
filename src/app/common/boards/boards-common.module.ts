import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SampleBoardComponent } from './sample-board/sample-board.component';
import { SupplierBoardComponent } from './supplier-board/supplier-board.component';


@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		SampleBoardComponent,
		SupplierBoardComponent,
	],
	exports: [
		SampleBoardComponent,
		SupplierBoardComponent,
	],
	entryComponents: []
})
export class BoardsCommonModule { }
