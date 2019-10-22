import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
	SupplierRequestDialogComponent,
} from '~common/modals/component/supplier-request-dialog/supplier-request-dialog.component';
import { ProductCommonModule } from '~common/product/product-common.module';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { InputsModule } from '~shared/inputs';
import { PricePipe } from '~shared/price/price.pipe';
import { SharedModule } from '~shared/shared.module';
import { TableModule } from '~shared/table';
import { UtilsModule } from '~shared/utils';

import {
	ChangePswdDlgComponent,
	CompareProductComponent,
	CreationDialogComponent,
	CreationProductDlgComponent,
	CreationSampleDlgComponent,
	CreationTaskDlgComponent,
	DescriptionDlgComponent,
	EditionDialogComponent,
	ExportDlgComponent,
	InviteUserDlgComponent,
	MassEditDlgComponent,
	MergeDialogComponent,
	NewContactDlgComponent,
	ProductAddToProjectDlgComponent,
	ProductRequestTeamFeedbackDlgComponent,
	ProductSelectDlgComponent,
	RefuseReplyDlgComponent,
	ReplySentDlgComponent,
	RequestReplyDlgComponent,
	VoteDetailsDialogComponent,
} from './component';
import { CompareColumnComponent } from './component/compare-product/compare-column/compare-column.component';
import { CompareLabelsComponent } from './component/compare-product/compare-labels/compare-labels.component';
import { ExportSelectionViewComponent } from './component/export-dlg/export-selection-view/export-selection-view.component';
import { ExportWaitingViewComponent } from './component/export-dlg/export-waiting-view/export-waiting-view.component';
import { ReviewRequestReplyDlgComponent } from './component/review-request-reply-dlg/review-request-reply-dlg.component';
import {
	ProductRequestListComponent,
} from './component/supplier-request-dialog/product-request-list/product-request-list.component';
import { ProductDialogService } from './services';
import { CrudDialogService } from './services/crud-dialog.service';

// imported at the root because https://github.com/angular/angular/issues/14324

const modals = [
	ChangePswdDlgComponent,
	CompareProductComponent,
	CreationDialogComponent,
	CreationProductDlgComponent,
	DescriptionDlgComponent,
	EditionDialogComponent,
	ExportDlgComponent,
	InviteUserDlgComponent,
	MassEditDlgComponent,
	MergeDialogComponent,
	NewContactDlgComponent,
	ProductAddToProjectDlgComponent,
	ProductRequestTeamFeedbackDlgComponent,
	RefuseReplyDlgComponent,
	ReplySentDlgComponent,
	RequestReplyDlgComponent,
	SupplierRequestDialogComponent,
	VoteDetailsDialogComponent,
	ReviewRequestReplyDlgComponent,
	CreationTaskDlgComponent,
	CreationSampleDlgComponent,
	ProductSelectDlgComponent
];

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		ProductCommonModule,
		TableModule,
		InputsModule,
		UtilsModule,
		TablesCommonModule
	],
	declarations: [
		...modals,
		ExportSelectionViewComponent,
		ExportWaitingViewComponent,
		ProductRequestListComponent,
		CompareLabelsComponent,
		CompareColumnComponent,
	],
	entryComponents: modals,
	providers: [
		ProductDialogService,
		CrudDialogService,
		PricePipe
	]
})
export class CommonModalsModule { }
