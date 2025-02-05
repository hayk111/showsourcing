import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductCommonModule } from '~common/product/product-common.module';
import { SharedModule } from '~shared/shared.module';

import { QuoteComponent, QuoteListComponent } from './components';

@NgModule({
	imports: [
		CommonModule,
		ProductCommonModule,
		ProductCommonModule,
		SharedModule
	],
	declarations: [QuoteListComponent, QuoteComponent],
	exports: [QuoteListComponent, QuoteComponent],
	providers: []
})
export class QuoteCommonModule { }
