import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SampleCardComponent } from './sample-card/sample-card.component';
import { SupplierCardComponent } from './supplier-card/supplier-card.component';


@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		SampleCardComponent,
		SupplierCardComponent,
	],
	exports: [
		SampleCardComponent,
		SupplierCardComponent,
	],
	entryComponents: []
})
export class CardsCommonModule { }
