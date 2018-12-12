import { Injectable, NgModuleRef } from '@angular/core';
import {
	CompareQuotationComponent,
	CreationDialogComponent,
	EditionDialogComponent,
	MergeDialogComponent,
	ProductAddToProjectDlgComponent,
	ProductExportDlgComponent,
	ProductRequestTeamFeedbackDlgComponent,
	CompareProductComponent,
	RfqDialogComponent,
} from '~common/modals/component';
import { FindProductsDialogComponent } from '~common/product/containers/find-products-dialog/find-products-dialog.component';
import { InviteUserDlgComponent } from '~features/settings/components/invite-user-dlg/invite-user-dlg.component';
import { EntityMetadata, Product } from '~models';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { DialogService } from '~shared/dialog/services';

@Injectable({ providedIn: 'root' })
export class CommonDialogService {

	constructor(
		private dlgSrv: DialogService,
		private moduleRef: NgModuleRef<any>
	) { }

	/** opens the create dialog,
	 * @param shouldRedirect whether we redirect after creation to entityMetadata.createUrl
	 * if its truem otherwise it will stay on the same page
	 */
	openCreateDlg(entityMetadata: EntityMetadata, shouldRedirect: boolean = false) {
		this.dlgSrv.openFromModule(
			CreationDialogComponent,
			this.moduleRef,
			{ shouldRedirect, type: entityMetadata }
		);
	}

	/** opens the edit dialog, to change the name of an entity, if the enitty does not have a name attribute check Event model for example*/
	openEditDlg(entity: any, entityMetadata: EntityMetadata) {
		this.dlgSrv.openFromModule(
			EditionDialogComponent,
			this.moduleRef,
			{ entity, type: entityMetadata }
		);
	}

	/** Opens a dialog that lets the user add different products to different projects (many to many) */
	openAddToProjectDialog(products?: Product[]) {
		this.dlgSrv.openFromModule(ProductAddToProjectDlgComponent, this.moduleRef, {
			selectedProducts: products
		});
	}

	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	openExportDialog(products?: Product[]) {
		this.dlgSrv.openFromModule(ProductExportDlgComponent, this.moduleRef, {
			selectedProducts: products
		});
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog(products?: Product[]) {
		this.dlgSrv.openFromModule(ProductRequestTeamFeedbackDlgComponent, this.moduleRef, {
			selectedProducts: products
		});
	}

	/** Opens a dialog that lets the user compare quotation between products */
	openCompareQuotationDialog(products: Product[]) {
		this.dlgSrv.openFromModule(CompareQuotationComponent, this.moduleRef, {
			products
		});
	}

	openFindProductDlg(products: Product[], callback: any) {
		this.dlgSrv.openFromModule(FindProductsDialogComponent, this.moduleRef, {
			shouldRedirect: false,
			initialSelectedProducts: products,
			submitCallback: callback
		});
	}

	openCompareProductDialog(products: Product[]) {
		this.dlgSrv.openFromModule(CompareProductComponent, this.moduleRef, {
			products: products
		});
	}

	openConfirmDialog(data: {
		text: string,
		callback: any
	}) {
		this.dlgSrv.open(ConfirmDialogComponent, data);
	}

	openRequestQuotationDialog(product: Product) {
		this.dlgSrv.openFromModule(RfqDialogComponent, this.moduleRef, { product });
	}

	openMergeDialog(data: { type: any, entities: any[] }) {
		this.dlgSrv.openFromModule(MergeDialogComponent, this.moduleRef, data);
	}

	openInvitationDialog(callback?: any) {
		this.dlgSrv.openFromModule(InviteUserDlgComponent, this.moduleRef, callback);
	}

	close() {
		this.dlgSrv.close();
	}

}
