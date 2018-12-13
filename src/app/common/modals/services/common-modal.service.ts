import { Injectable } from '@angular/core';
import {
	CompareProductComponent,
	CompareQuotationComponent,
	CreationDialogComponent,
	EditionDialogComponent,
	MergeDialogComponent,
	ProductAddToProjectDlgComponent,
	ProductExportDlgComponent,
	ProductRequestTeamFeedbackDlgComponent,
	RfqDialogComponent,
} from '~common/modals/component';
import { FindProductsDialogComponent } from '~common/product/containers/find-products-dialog/find-products-dialog.component';
import { InviteUserDlgComponent } from '~common/modals/component';
import { EntityMetadata, Product } from '~models';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { DialogService } from '~shared/dialog/services';

@Injectable({ providedIn: 'root' })
export class CommonModalService {

	constructor(
		private dlgSrv: DialogService,
	) { }

	/** opens the create dialog,
	 * @param shouldRedirect whether we redirect after creation to entityMetadata.createUrl
	 * if its truem otherwise it will stay on the same page
	 */
	openCreateDlg(entityMetadata: EntityMetadata, shouldRedirect: boolean = false) {
		this.dlgSrv.open(
			CreationDialogComponent,
			{ shouldRedirect, type: entityMetadata }
		);
	}

	/** opens the edit dialog, to change the name of an entity, if the enitty does not have a name attribute check Event model for example*/
	openEditDlg(entity: any, entityMetadata: EntityMetadata) {
		this.dlgSrv.open(
			EditionDialogComponent,
			{ entity, type: entityMetadata }
		);
	}

	/** Opens a dialog that lets the user add different products to different projects (many to many) */
	openAddToProjectDialog(products?: Product[]) {
		this.dlgSrv.open(ProductAddToProjectDlgComponent, {
			selectedProducts: products
		});
	}

	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	openExportDialog(products?: Product[]) {
		this.dlgSrv.open(ProductExportDlgComponent, {
			selectedProducts: products
		});
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog(products?: Product[]) {
		this.dlgSrv.open(ProductRequestTeamFeedbackDlgComponent, {
			selectedProducts: products
		});
	}

	/** Opens a dialog that lets the user compare quotation between products */
	openCompareQuotationDialog(products: Product[]) {
		this.dlgSrv.open(CompareQuotationComponent, {
			products
		});
	}

	openFindProductDlg(products: Product[], callback: any) {
		this.dlgSrv.open(FindProductsDialogComponent, {
			shouldRedirect: false,
			initialSelectedProducts: products,
			submitCallback: callback
		});
	}

	openCompareProductDialog(products: Product[]) {
		this.dlgSrv.open(CompareProductComponent, {
			products: products
		});
	}

	openConfirmDialog(data: {
		text: string,
		callback: any
	}) {
		return this.dlgSrv.open(ConfirmDialogComponent, data);
	}

	openRequestQuotationDialog(product: Product) {
		return this.dlgSrv.open(RfqDialogComponent, { product });
	}

	openMergeDialog(data: { type: any, entities: any[] }) {
		return this.dlgSrv.open(MergeDialogComponent, data);
	}

	openInvitationDialog() {
		return this.dlgSrv.open(InviteUserDlgComponent);
	}

	close() {
		this.dlgSrv.close();
	}

}
