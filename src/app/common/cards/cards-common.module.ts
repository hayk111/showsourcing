import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';

import { ProductCardComponent } from './product-card/product-card.component';
import {
	ProductCardActivitiesComponent,
} from './product-grid-card/product-card-activities/product-card-activities.component';
import { ProductGridCardComponent } from './product-grid-card/product-grid-card.component';
import { SampleCardComponent } from './sample-card/sample-card.component';
import { SupplierCardComponent } from './supplier-card/supplier-card.component';


@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: [
		ProductCardComponent,
		ProductGridCardComponent,
		ProductCardActivitiesComponent,
		SampleCardComponent,
		SupplierCardComponent,
	],
	exports: [
		ProductCardComponent,
		ProductGridCardComponent,
		ProductCardActivitiesComponent,
		SampleCardComponent,
		SupplierCardComponent,
	],
	entryComponents: []
})
export class CardsCommonModule { }
