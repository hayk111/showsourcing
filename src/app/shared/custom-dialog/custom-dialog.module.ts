import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from '~shared/dialog';
import { SharedModule } from '~shared/shared.module';
import { ProductDialogService } from '~shared/custom-dialog/services';

import {
	CreationDialogComponent,
	EditionDialogComponent,
	MergeDialogComponent,
	ProductAddToProjectDlgComponent,
	ProductExportDlgComponent,
	CompareQuotationComponent,
	ProductRequestTeamFeedbackDlgComponent,
} from '~shared/custom-dialog/component';
import { CrudDialogService } from '~shared/custom-dialog/services/crud-dialog.service';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';
import { RfqDialogComponent } from './component/rfq-dialog/rfq-dialog.component';
import { EmailListComponent } from './component/rfq-dialog/email-list/email-list.component';
import { ItemCompareColumnComponent } from './component/compare-quotation/item-comapre-column/item-comapre-column.component';
import { StageIndicatorModule } from '~shared/stage-indicator/stage-indicator.module';
import { CarouselModule } from '~shared/carousel';

@NgModule({
	imports: [
		CommonModule,
		DialogModule,
		SharedModule,
		SearchBarModule,
		StageIndicatorModule,
		CarouselModule
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
export class CustomDialogModule { }
