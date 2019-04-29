import { Injectable } from '@angular/core';
import {
	CompareProductComponent,
	CreationDialogComponent,
	EditionDialogComponent,
	ExportDlgComponent,
	InviteUserDlgComponent,
	MergeDialogComponent,
	NewContactDlgComponent,
	ProductAddToProjectDlgComponent,
	ProductRequestTeamFeedbackDlgComponent,
	SupplierRequestDialogComponent,
	VoteDetailsDialogComponent,
	RefuseReplyDlgComponent,
} from '~common/modals/component';
import { FindProductsDialogComponent } from '~common/product/containers/find-products-dialog/find-products-dialog.component';
import { EntityMetadata, Product, ProductVote, Project, Supplier } from '~models';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { DialogService } from '~shared/dialog/services';
import { ID } from '~utils';

import { ReviewRequestReplyDlgComponent } from '../component/review-request-reply-dlg/review-request-reply-dlg.component';

/**
 * Service used to open dialogs, the goal of this service is to bring easy typing
 * for data in dialog as well as to relieve the imports of the dlg components
 * which might bring some circular dependencies from time to time
 */
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
		return this.dlgSrv.open(CreationDialogComponent, { shouldRedirect, type: entityMetadata });
	}

	/** opens the edit dialog, to change the name of an entity, if the enitty does not have a name attribute check Event model for example*/
	openEditDlg(entity: any, entityMetadata: EntityMetadata) {
		return this.dlgSrv.open(EditionDialogComponent, { entity, type: entityMetadata });
	}

	/** Opens a dialog that lets the user add different products to different projects (many to many) */
	openAddToProjectDialog(products?: Product[]) {
		return this.dlgSrv.open(ProductAddToProjectDlgComponent, { products });
	}

	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	openExportDialog(targets?: Product[] | Supplier[]) {
		return this.dlgSrv.open(ExportDlgComponent, { targets });
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog(products?: Product[]) {
		return this.dlgSrv.open(ProductRequestTeamFeedbackDlgComponent, { products });
	}

	openFindProductDlg(initialSelectedProducts: Product[], project: Project) {
		return this.dlgSrv.open(FindProductsDialogComponent, {
			initialSelectedProducts, project
		});
	}

	openCompareProductDialog(products: Product[]) {
		return this.dlgSrv.open(CompareProductComponent, { products });
	}

	openConfirmDialog(data: { text: string }) {
		return this.dlgSrv.open(ConfirmDialogComponent, data);
	}

	openSupplierRequest(products: Product[]) {
		return this.dlgSrv.open(SupplierRequestDialogComponent, { products });
	}

	openMergeDialog(data: { type: any, entities: any[] }) {
		return this.dlgSrv.open(MergeDialogComponent, data);
	}

	openInvitationDialog() {
		return this.dlgSrv.open(InviteUserDlgComponent);
	}

	openReviewRequestReplyDlg(data: { elementId: ID, selectedIndex: number, requestId: ID }) {
		return this.dlgSrv.open(ReviewRequestReplyDlgComponent, data);
	}

	/** Opens a dialog that let you see the list of people who have voted */
	openVoteDetailsDialog(votes: ProductVote[]) {
		return this.dlgSrv.open(VoteDetailsDialogComponent, { votes });
	}

	openNewContactDlg(data: { isNewContact?: boolean, supplier?: Supplier, contactId?: string }) {
		return this.dlgSrv.open(NewContactDlgComponent, data);
	}

	openRefuseReplyDlg(data: { senderName: string, recipientName: string, replyId: ID }) {
		return this.dlgSrv.open(RefuseReplyDlgComponent, data);
	}

	close() {
		this.dlgSrv.close();
	}

}
