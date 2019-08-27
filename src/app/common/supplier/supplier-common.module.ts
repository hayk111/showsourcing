import { NgModule } from '@angular/core';
import { CommentCommonModule } from '~common/comment';
import { SharedModule } from '~shared/shared.module';

import { SupplierPreviewComponent, SupplierBoardComponent, SupplierCardComponent } from './components';

@NgModule({
	imports: [
		SharedModule,
		CommentCommonModule
	],
	declarations: [SupplierPreviewComponent, SupplierBoardComponent, SupplierCardComponent],
	exports: [SupplierPreviewComponent, SupplierBoardComponent, SupplierCardComponent]
})
export class SupplierCommonModule { }
