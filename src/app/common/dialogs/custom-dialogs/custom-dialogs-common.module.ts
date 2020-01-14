import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PricePipe } from '~shared/price/price.pipe';
import { SharedModule } from '~shared/shared.module';

import { CrudDialogService } from '../services/crud-dialog.service';
import { ProductDialogService } from '../services/product-dialog.service';
import { ChangePswdDlgComponent } from './change-pswd-dlg/change-pswd-dlg.component';
import { CompareColumnComponent } from './compare-product/compare-column/compare-column.component';
import { CompareLabelsComponent } from './compare-product/compare-labels/compare-labels.component';
import { CompareProductComponent } from './compare-product/compare-product.component';
import { CompareSpacerComponent } from './compare-product/compare-spacer/compare-spacer.component';
import { DescriptionDlgComponent } from './description-dlg/description-dlg.component';
import { EditionDialogComponent } from './edition-dialog/edition-dialog.component';
import { ExportDlgComponent } from './export-dlg/export-dlg.component';
import { ExportSelectionViewComponent } from './export-dlg/export-selection-view/export-selection-view.component';
import { ExportWaitingViewComponent } from './export-dlg/export-waiting-view/export-waiting-view.component';
import { InviteUserDlgComponent } from './invite-user-dlg/invite-user-dlg.component';
import { MassEditDlgComponent } from './mass-edit-dlg/mass-edit-dlg.component';
import { MergeDialogComponent } from './merge-dialog/merge-dialog.component';
import { NewContactDlgComponent } from './new-contact-dlg/new-contact-dlg.component';
import {
	ProductRequestTeamFeedbackDlgComponent,
} from './product-request-team-feedback-dlg/product-request-team-feedback-dlg.component';
import { RefuseReplyDlgComponent } from './refuse-reply-dlg/refuse-reply-dlg.component';
import { ReplySentDlgComponent } from './reply-sent-dlg/reply-sent-dlg.component';
import { RequestReplyDlgComponent } from './request-reply-dlg/request-reply-dlg.component';
import { ReviewRequestReplyDlgComponent } from './review-request-reply-dlg/review-request-reply-dlg.component';
import { ProductRequestListComponent } from './supplier-request-dialog/product-request-list/product-request-list.component';
import { SupplierRequestDialogComponent } from './supplier-request-dialog/supplier-request-dialog.component';
import { VoteDetailsDialogComponent } from './vote-details-dialog/vote-details-dialog.component';

const modals = [
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
	ReviewRequestReplyDlgComponent,
	SupplierRequestDialogComponent,
	VoteDetailsDialogComponent
];

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: [
		...modals,
		ExportSelectionViewComponent,
		ExportWaitingViewComponent,
		ProductRequestListComponent,
		CompareLabelsComponent,
		CompareColumnComponent,
		CompareSpacerComponent
	],
	entryComponents: modals,
	providers: [
		CrudDialogService,
		PricePipe,
		ProductDialogService
	]
})
export class CustomDialogsCommonModule { }
