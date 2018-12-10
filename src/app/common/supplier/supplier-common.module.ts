import { NgModule } from '@angular/core';
import { CommentCommonModule } from '~common/comment';
import { SharedModule } from '~shared/shared.module';

import { SupplierPreviewComponent } from './components';

@NgModule({
	imports: [
		SharedModule,
		CommentCommonModule
	],
	declarations: [SupplierPreviewComponent],
	exports: [SupplierPreviewComponent]
})
export class SupplierCommonModule { }
