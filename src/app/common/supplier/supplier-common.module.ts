import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommentCommonModule } from '~common/comment';
import { SharedModule } from '~shared/shared.module';

import { SupplierPreviewComponent, SupplierBoardComponent, SupplierCardComponent } from './components';

@NgModule({
	imports: [
		SharedModule,
		CommentCommonModule,
		RouterModule,
	],
	declarations: [SupplierPreviewComponent, SupplierBoardComponent, SupplierCardComponent],
	exports: [SupplierPreviewComponent, SupplierBoardComponent, SupplierCardComponent]
})
export class SupplierCommonModule { }
