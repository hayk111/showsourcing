import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductCommonModule } from '~common/product';
import { SharedModule } from '~shared/shared.module';

import { ProductGeneralInfoComponent } from './product-general-info/product-general-info.component';
import { ProductGridCardDeprecatedComponent } from './product-grid-card-deprecated/product-grid-card-deprecated.component';
import { SupplierCardComponent } from './supplier-card/supplier-card.component';

@NgModule({
	imports: [
		SharedModule,
		CommonModule,
		ProductCommonModule
	],
	declarations: [
		ProductGridCardDeprecatedComponent,
		SupplierCardComponent,
		ProductGeneralInfoComponent
	],
	exports: [
		ProductGridCardDeprecatedComponent,
	]
})
export class DeprecatedModule { }
