import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductCardComponent } from './product-card/product-card.component';
import { SampleCardComponent } from './sample-card/sample-card.component';
import { SupplierCardComponent } from './supplier-card/supplier-card.component';


@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		ProductCardComponent,
		SampleCardComponent,
		SupplierCardComponent,
	],
	exports: [
		ProductCardComponent,
		SampleCardComponent,
		SupplierCardComponent,
	],
	entryComponents: []
})
export class CardsCommonModule { }
