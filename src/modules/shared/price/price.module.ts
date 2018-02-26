import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PriceComponent } from './components/price/price.component';

@NgModule({
	imports: [CommonModule],
	declarations: [PriceComponent],
	exports: [PriceComponent],
})
export class PriceModule {}
