import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSmallCardComponent } from './components/product-small-card/product-small-card.component';
import { ProductBigCardComponent } from './components/product-big-card/product-big-card.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [ ProductSmallCardComponent, ProductBigCardComponent ],
	exports: [ ProductSmallCardComponent, ProductBigCardComponent ]
})
export class ProductModule { }
