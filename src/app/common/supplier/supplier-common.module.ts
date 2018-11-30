import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewSupplierComponent } from './components/preview-supplier/preview-supplier.component';
import { SharedModule } from '~shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: [PreviewSupplierComponent],
	exports: [PreviewSupplierComponent]
})
export class SupplierCommonModule { }
