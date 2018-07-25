import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OneProductActivityCardComponent } from './components/one-product-activity-card/one-product-activity-card.component';
import {
	MultipleProductsActivityCardComponent
} from './components/multiple-products-activity-card/multiple-products-activity-card.component';
import { SharedModule } from '~shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: [
		OneProductActivityCardComponent,
		MultipleProductsActivityCardComponent
	],
	exports: [
		OneProductActivityCardComponent,
		MultipleProductsActivityCardComponent
	]
})
export class ActivityModule { }
