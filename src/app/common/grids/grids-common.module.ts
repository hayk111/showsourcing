import { NgModule } from '@angular/core';
import { CardsCommonModule } from '~common/cards/cards-common.module';
import { SharedModule } from '~shared/shared.module';

import { ProductsGridComponent } from './products-grid/products-grid.component';

@NgModule({
	imports: [
		SharedModule,
		CardsCommonModule
	],
	declarations: [ProductsGridComponent],
	exports: [ProductsGridComponent]
})
export class GridsCommonModule { }
