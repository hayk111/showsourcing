import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ProductsCardViewDialogComponent,
} from '~common/product/components/products-card-view-dialog/products-card-view-dialog.component';
import { FindProductsDialogComponent } from '~common/product/containers/find-products-dialog/find-products-dialog.component';
import { ProductCommonModule } from '~common/product/product-common.module';
import { InputsModule } from '~shared/inputs';
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
  RequestViewDlgComponent,
  SupplierRequestDialogComponent,
  VoteDetailsDialogComponent,
} from './component';
import { ExportSelectionViewComponent } from './component/export-dlg/export-selection-view/export-selection-view.component';
import { ExportWaitingViewComponent } from './component/export-dlg/export-waiting-view/export-waiting-view.component';
import { EmailListComponent } from './component/rfq-dialog/email-list/email-list.component';
import { RfqDialogComponent } from './component/rfq-dialog/rfq-dialog.component';
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
	EmailListComponent,
	ExportDlgComponent,
	FindProductsDialogComponent,
	InviteUserDlgComponent,
	MergeDialogComponent,
	NewContactDlgComponent,
	ProductAddToProjectDlgComponent,
	ProductRequestTeamFeedbackDlgComponent,
	RequestViewDlgComponent,
	RfqDialogComponent,
	SupplierRequestDialogComponent,
	VoteDetailsDialogComponent,
];

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		ProductCommonModule,
		TableModule,
		InputsModule,
		UtilsModule
	],
	declarations: [
		...modals,
		ProductsCardViewDialogComponent,
		ExportSelectionViewComponent,
		ExportWaitingViewComponent,
		ProductRequestListComponent,
		RequestViewDlgComponent
	],
	entryComponents: modals,
	providers: [
		ProductDialogService,
		CrudDialogService,
	]
})
export class CommonModalsModule { }
