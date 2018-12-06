import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
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
import { SharedModule } from '~shared/shared.module';

import { ItemCompareColumnComponent } from './component/compare-quotation/item-comapre-column/item-comapre-column.component';
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
		ProductExportDlgComponent,
		ItemCompareColumnComponent,
		EmailListComponent,
		RfqDialogComponent
	],
	entryComponents: [
		CreationDialogComponent,
		EditionDialogComponent,
		MergeDialogComponent,
		ProductAddToProjectDlgComponent,
		CompareQuotationComponent,
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
