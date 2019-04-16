import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
	ProductsCardViewDialogComponent,
} from '~common/product/components/products-card-view-dialog/products-card-view-dialog.component';
import { FindProductsDialogComponent } from '~common/product/containers/find-products-dialog/find-products-dialog.component';
import { ProductCommonModule } from '~common/product/product-common.module';
import { InputsModule } from '~shared/inputs';
import { PricePipe } from '~shared/price/price.pipe';
import { SharedModule } from '~shared/shared.module';
import { TableModule } from '~shared/table';
import { UtilsModule } from '~shared/utils';

import {
	ChangePswdDlgComponent,
	CompareProductComponent,
	CompareQuotationComponent,
	CreationDialogComponent,
	EditionDialogComponent,
	ExportDlgComponent,
	InviteUserDlgComponent,
	MergeDialogComponent,
	NewContactDlgComponent,
	ProductAddToProjectDlgComponent,
	ProductRequestTeamFeedbackDlgComponent,
	RefuseReplyDlgComponent,
	ReplySentDlgComponent,
	RequestReplyDlgComponent,
	SupplierRequestDialogComponent,
	VoteDetailsDialogComponent,
} from './component';
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
	CompareQuotationComponent,
	CreationDialogComponent,
	EditionDialogComponent,
	ExportDlgComponent,
	FindProductsDialogComponent,
	InviteUserDlgComponent,
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
];

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		ProductCommonModule,
		TableModule,
		InputsModule,
		UtilsModule,
	],
	declarations: [
		...modals,
		ProductsCardViewDialogComponent,
		ExportSelectionViewComponent,
		ExportWaitingViewComponent,
		ProductRequestListComponent,
	],
	entryComponents: modals,
	providers: [
		ProductDialogService,
		CrudDialogService,
		PricePipe
	]
})
export class CommonModalsModule { }
