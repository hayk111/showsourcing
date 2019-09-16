import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommentCommonModule } from '~common/comment';
import { SharedModule } from '~shared/shared.module';

import { SupplierListViewComponent, SupplierPreviewComponent, SupplierBoardComponent, SupplierCardComponent } from './components';

@NgModule({
	imports: [
		SharedModule,
		CommentCommonModule,
		RouterModule,
	],
	declarations: [SupplierListViewComponent, SupplierPreviewComponent, SupplierBoardComponent, SupplierCardComponent],
	exports: [SupplierListViewComponent, SupplierPreviewComponent, SupplierBoardComponent, SupplierCardComponent]
})
export class SupplierCommonModule { }
