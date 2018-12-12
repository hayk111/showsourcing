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
} from './component';
import { ProductDialogService } from './services';
import { CrudDialogService } from './services/crud-dialog.service';
import { FindProductsDialogComponent } from '~common/product/containers/find-products-dialog/find-products-dialog.component';
import { ProductElementModule } from '~common/product/product-elements-module';
import { SharedModule } from '~shared/shared.module';
import { TableModule } from '~shared/table';

import { EmailListComponent } from './component/rfq-dialog/email-list/email-list.component';
import { RfqDialogComponent } from './component/rfq-dialog/rfq-dialog.component';
import { ProductsCardViewDialogComponent } from '~common/product/components/products-card-view-dialog/products-card-view-dialog.component';
import { ProductCommonModule } from '~common/product';

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
	FindProductsDialogComponent
];

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		ProductCommonModule,
		TableModule
	],
	declarations: [...modals, ProductsCardViewDialogComponent],
	entryComponents: modals,
	providers: [
		ProductDialogService,
		CrudDialogService
	]
})
export class CommonModalsModule { }
