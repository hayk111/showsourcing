import { Inject, Injectable, NgModuleRef, Optional } from '@angular/core';
import { EntityMetadata, ERM_TOKEN, Product } from '~models';
import {
	CompareQuotationComponent,
	CreationDialogComponent,
	EditionDialogComponent,
	ProductAddToProjectDlgComponent,
	ProductExportDlgComponent,
	ProductRequestTeamFeedbackDlgComponent,
	RfqDialogComponent,
	MergeDialogComponent
} from '~common/dialog/component';
import { DialogService } from '~shared/dialog/services';
import { SelectionService } from '~core/list-page/selection.service';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { InviteUserDlgComponent } from '~features/settings/components/invite-user-dlg/invite-user-dlg.component';


@Injectable({ providedIn: 'root' })
export class CommonDialogService {

	/** dialog to edit an item in the list.. (can be overidden)*/
	editDlgComponent = EditionDialogComponent;
	/** dialog to create an entity (can be overidden) */
	createDlgComponent = CreationDialogComponent;
	/** dialog used to confirm an action */
	confirmDialogComponent = ConfirmDialogComponent;
	/** dialog used to invite an user */
	inviteUserDlgComponent = InviteUserDlgComponent; // TODO: this is not commonly used, shouldn't be here

	constructor(
		private dlgSrv: DialogService,
		private moduleRef: NgModuleRef<any>,
		private selectionSrv: SelectionService,
		@Optional() @Inject(ERM_TOKEN) private entityMetadata: EntityMetadata
	) {
	}

	/** opens the create dialog,
	 * @param shouldRedirect whether we redirect after creation to entityMetadata.createUrl
	 * if its truem otherwise it will stay on the same page
	 */
	openCreateDlg(shouldRedirect: boolean = false) {
		this.dlgSrv.openFromModule(
			this.createDlgComponent,
			this.moduleRef,
			{ shouldRedirect, type: this.entityMetadata }
		);
	}

	/** opens the edit dialog, to change the name of an entity, if the enitty does not have a name attribute check Event model for example*/
	openEditDlg(entity: any) {
		this.dlgSrv.openFromModule(
			this.editDlgComponent,
			this.moduleRef,
			{ entity, type: this.entityMetadata }
		);
	}

	/** Opens a dialog that lets the user add different products to different projects (many to many) */
	openAddToProjectDialog(products?: Product[]) {
		this.dlgSrv.openFromModule(ProductAddToProjectDlgComponent, this.moduleRef, {
			selectedProducts: products ? products : this.getSelectionValues()
		});
	}

	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	openExportDialog(products?: Product[]) {
		this.dlgSrv.openFromModule(ProductExportDlgComponent, this.moduleRef, {
			selectedProducts: products ? products : this.getSelectionValues()
		});
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog(products?: Product[]) {
		this.dlgSrv.openFromModule(ProductRequestTeamFeedbackDlgComponent, this.moduleRef, {
			selectedProducts: products ? products : this.getSelectionValues()
		});
	}

	/** Opens a dialog that lets the user compare quotation between products */
	openCompareQuotationDialog() {
		this.dlgSrv.openFromModule(CompareQuotationComponent, this.moduleRef, {
			products: this.getSelectionValues()
		});
	}

	openFindProductDlg(products: Product[], callback: any) {
		this.dlgSrv.openFromModule(this.createDlgComponent, this.moduleRef, {
			type: this.entityMetadata,
			shouldRedirect: false,
			initialSelectedProducts: products,
			submitCallback: callback
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

	private getSelectionValues() {
		return this.selectionSrv.getSelectionValues();
	}

}