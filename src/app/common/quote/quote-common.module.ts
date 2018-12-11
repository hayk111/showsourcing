import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { ProductCommonModule } from '~common/product/product-common.module';
import { ProductElementModule } from '~common/product/product-elements-module';
import { SharedModule } from '~shared/shared.module';

import { QuoteComponent, QuoteListComponent } from './components';

@NgModule({
	imports: [
		CommonModule,
		ProductCommonModule,
		ProductElementModule,
		SharedModule
	],
	declarations: [QuoteListComponent, QuoteComponent],
	exports: [QuoteListComponent, QuoteComponent],
	providers: [
		CommonDialogService
	]
})
export class QuoteCommonModule { }
