import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
	CompareProductComponent,
	CompareQuotationComponent,
	CreationDialogComponent,
	EditionDialogComponent,
	MergeDialogComponent,
	ProductAddToProjectDlgComponent,
	ProductExportDlgComponent,
	ProductRequestTeamFeedbackDlgComponent,
} from '~common/dialog/component';
import { ProductDialogService } from '~common/dialog/services';
import { CrudDialogService } from '~common/dialog/services/crud-dialog.service';
import { FindProductsDialogComponent } from '~common/product/containers/find-products-dialog/find-products-dialog.component';
import { ProductElementModule } from '~common/product/product-elements-module';
import { SharedModule } from '~shared/shared.module';
import { TableModule } from '~shared/table';

import { EmailListComponent } from './component/rfq-dialog/email-list/email-list.component';
import { RfqDialogComponent } from './component/rfq-dialog/rfq-dialog.component';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		ProductElementModule,
		TableModule
	],
	declarations: [
		CreationDialogComponent,
		EditionDialogComponent,
		MergeDialogComponent,
		ProductAddToProjectDlgComponent,
		ProductRequestTeamFeedbackDlgComponent,
		CompareQuotationComponent,
		CompareProductComponent,
		ProductExportDlgComponent,
		EmailListComponent,
		RfqDialogComponent,
	],
	entryComponents: [
		CreationDialogComponent,
		EditionDialogComponent,
		MergeDialogComponent,
		ProductAddToProjectDlgComponent,
		CompareQuotationComponent,
		CompareProductComponent,
		ProductRequestTeamFeedbackDlgComponent,
		ProductExportDlgComponent,
		FindProductsDialogComponent,
		RfqDialogComponent
	],
	providers: [
		ProductDialogService,
		CrudDialogService
	]
})
export class DialogCommonModule { }
