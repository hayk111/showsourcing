import { NgModule } from '@angular/core';
import { CommentCommonModule } from '~common/comment';
import { SharedModule } from '~shared/shared.module';

import { SupplierPreviewComponent, SupplierListViewComponent } from './components';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		SharedModule,
		CommentCommonModule,
		RouterModule,
	],
	declarations: [SupplierPreviewComponent, SupplierListViewComponent],
	exports: [SupplierPreviewComponent, SupplierListViewComponent]
})
export class SupplierCommonModule { }
