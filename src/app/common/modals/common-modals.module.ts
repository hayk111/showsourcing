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
	InviteUserDlgComponent,
	ChangePswdDlgComponent,
} from './component';
import { ProductDialogService } from './services';
import { CrudDialogService } from './services/crud-dialog.service';
import { FindProductsDialogComponent } from '~common/product/containers/find-products-dialog/find-products-dialog.component';
import { ProductCommonModule } from '~common/product/product-common.module';
import { SharedModule } from '~shared/shared.module';
import { TableModule } from '~shared/table';
import { InputsModule } from '~shared/inputs';
import { EmailListComponent } from './component/rfq-dialog/email-list/email-list.component';
import { RfqDialogComponent } from './component/rfq-dialog/rfq-dialog.component';
import { ProductsCardViewDialogComponent } from '~common/product/components/products-card-view-dialog/products-card-view-dialog.component';
import { UtilsModule } from '~shared/utils';

// imported at the root because https://github.com/angular/angular/issues/14324


const modals = [
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
	FindProductsDialogComponent,
	InviteUserDlgComponent,
	ChangePswdDlgComponent
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
	declarations: [...modals, ProductsCardViewDialogComponent],
	entryComponents: modals,
	providers: [
		ProductDialogService,
		CrudDialogService
	]
})
export class CommonModalsModule { }
