import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SSPricePipe } from '~shared/price/price.pipe';

import { PriceComponent } from '~shared/price/components/price/price.component';

@NgModule({
	imports: [CommonModule],
	declarations: [PriceComponent, SSPricePipe],
	exports: [PriceComponent, SSPricePipe],
})
export class PriceModule {}
