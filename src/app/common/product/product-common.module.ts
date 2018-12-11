import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';
import { PriceModule } from '~shared/price';
import { ListModule } from '~shared/list/list.module';


import { ProductPreviewComponent } from './containers';
import { ProductElementModule } from './product-elements-module';


@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
		PriceModule,
		ProductElementModule,
		ListModule
	],
	declarations: [
		ProductPreviewComponent
	],
	exports: [
		ProductPreviewComponent
	],
	entryComponents: [],
	providers: []
})
export class ProductCommonModule { }
