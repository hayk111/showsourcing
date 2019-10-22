import { NgModule } from '@angular/core';

import { ProductSelectionBarComponent } from './product-selection-bar/product-selection-bar.component';
import { SharedModule } from '~shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: [
		ProductSelectionBarComponent
	],
	exports: [
		ProductSelectionBarComponent
	],
	providers: []
})
export class SelectionBarsCommonModule { }
