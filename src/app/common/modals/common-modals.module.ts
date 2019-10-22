import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { InputsModule } from '~shared/inputs';
import { PricePipe } from '~shared/price/price.pipe';
import { SharedModule } from '~shared/shared.module';
import { TableModule } from '~shared/table';
import { UtilsModule } from '~shared/utils';

import { CrudDialogService, ProductDialogService } from '.';
import { CreationProductDlgComponent, CreationSampleDlgComponent, CreationTaskDlgComponent } from './creation';
import { CreationDialogComponent } from './creation/creation-dialog/creation-dialog.component';
import {
	ChangePswdDlgComponent,
	CompareProductComponent,
	DescriptionDlgComponent,
	EditionDialogComponent,
	ExportDlgComponent,
	InviteUserDlgComponent,
	MassEditDlgComponent,
	MergeDialogComponent,
	NewContactDlgComponent,
	ProductRequestTeamFeedbackDlgComponent,
	RefuseReplyDlgComponent,
	ReplySentDlgComponent,
	RequestReplyDlgComponent,
	VoteDetailsDialogComponent,
} from './custom';
import { CompareColumnComponent } from './custom/compare-product/compare-column/compare-column.component';
import { CompareLabelsComponent } from './custom/compare-product/compare-labels/compare-labels.component';
import { ExportSelectionViewComponent } from './custom/export-dlg/export-selection-view/export-selection-view.component';
import { ExportWaitingViewComponent } from './custom/export-dlg/export-waiting-view/export-waiting-view.component';
import { ReviewRequestReplyDlgComponent } from './custom/review-request-reply-dlg/review-request-reply-dlg.component';
import {
	ProductRequestListComponent,
} from './custom/supplier-request-dialog/product-request-list/product-request-list.component';
import { SupplierRequestDialogComponent } from './custom/supplier-request-dialog/supplier-request-dialog.component';
import { ProductAddToProjectDlgComponent, ProductSelectDlgComponent } from './selection';


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
