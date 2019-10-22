import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';

import { ProductsBoardComponent } from './products-board/products-board.component';
import { SamplesBoardComponent } from './samples-board/samples-board.component';
import { SuppliersBoardComponent } from './suppliers-board/suppliers-board.component';
import { CardsCommonModule } from '~common/cards/cards-common.module';


@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		CardsCommonModule
	],
	declarations: [
		ProductsBoardComponent,
		SamplesBoardComponent,
		SuppliersBoardComponent,
	],
	exports: [
		ProductsBoardComponent,
		SamplesBoardComponent,
		SuppliersBoardComponent,
	],
	entryComponents: []
})
export class BoardsCommonModule { }
