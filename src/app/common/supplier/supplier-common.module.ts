import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewSupplierComponent } from './components/preview-supplier/preview-supplier.component';
import { SharedModule } from '~shared/shared.module';
import { CommentCommonModule } from '~common/comment';

@NgModule({
	imports: [
		SharedModule,
		CommentCommonModule
	],
	declarations: [PreviewSupplierComponent],
	exports: [PreviewSupplierComponent]
})
export class SupplierCommonModule { }
