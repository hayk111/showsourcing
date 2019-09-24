import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommentCommonModule } from '~common/comment';
import { SharedModule } from '~shared/shared.module';

import { SupplierTableComponent, SupplierPreviewComponent, SupplierBoardComponent, SupplierCardComponent } from './components';

@NgModule({
	imports: [
		SharedModule,
		CommentCommonModule,
		RouterModule,
	],
	declarations: [SupplierTableComponent, SupplierPreviewComponent, SupplierBoardComponent, SupplierCardComponent],
	exports: [SupplierTableComponent, SupplierPreviewComponent, SupplierBoardComponent, SupplierCardComponent]
})
export class SupplierCommonModule { }
