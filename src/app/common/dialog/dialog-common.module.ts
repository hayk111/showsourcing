import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
	CompareQuotationComponent,
	CreationDialogComponent,
	EditionDialogComponent,
	MergeDialogComponent,
	ProductAddToProjectDlgComponent,
	ProductExportDlgComponent,
	CompareProductComponent,
	ProductRequestTeamFeedbackDlgComponent,
} from '~common/dialog/component';
import { ProductDialogService } from '~common/dialog/services';
import { CrudDialogService } from '~common/dialog/services/crud-dialog.service';
import { SharedModule } from '~shared/shared.module';

import { ItemCompareRowComponent } from './component/compare-quotation/item-comapre-row/item-comapre-row.component';
import { EmailListComponent } from './component/rfq-dialog/email-list/email-list.component';
import { RfqDialogComponent } from './component/rfq-dialog/rfq-dialog.component';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
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
		ItemCompareRowComponent,
		EmailListComponent,
		RfqDialogComponent
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
		RfqDialogComponent
	],
	providers: [
		ProductDialogService,
		CrudDialogService
	]
})
export class DialogCommonModule { }
