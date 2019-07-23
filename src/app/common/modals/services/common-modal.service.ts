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
	VoteDetailsDialogComponent,
	MassEditDlgComponent,
	RefuseReplyDlgComponent,
	CreationProductDlgComponent,
	CreationTaskDlgComponent,
	ProductSelectDlgComponent,
} from '~common/modals/component';
import { EntityMetadata, Product, ProductVote, Project, Supplier, ERM } from '~models';

import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { DialogService } from '~shared/dialog/services';
import { ID } from '~utils';

import { ReviewRequestReplyDlgComponent } from '../component/review-request-reply-dlg/review-request-reply-dlg.component';
import { filter, map } from 'rxjs/operators';
import { CloseEventType, CloseEvent } from '~shared/dialog';
import { Router } from '@angular/router';

/**
 * Service used to open dialogs, the goal of this service is to bring easy typing
 * for data in dialog as well as to relieve the imports of the dlg components
 * which might bring some circular dependencies from time to time
 */
@Injectable({ providedIn: 'root' })
export class CommonModalService {

	constructor(
		private router: Router,
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
	openExportDialog(targets?: Product[] | Supplier[], query?: string) {
		return this.dlgSrv.open(ExportDlgComponent, { targets, query });
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog(products?: Product[]) {
		return this.dlgSrv.open(ProductRequestTeamFeedbackDlgComponent, { products });
	}

	openSelectProductDlg(initialSelectedProducts?: Product[], submitProducts?: boolean) {
		return this.dlgSrv.open(ProductSelectDlgComponent, {
			initialSelectedProducts,
			submitProducts
		});
	}

	openCompareProductDialog(products: Product[]) {
		return this.dlgSrv.open(CompareProductComponent, { products });
	}

	openConfirmDialog(data: { text: string }) {
		return this.dlgSrv.open(ConfirmDialogComponent, data);
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

	openMassEditDialog(items: any[], type: EntityMetadata) {
		return this.dlgSrv.open(MassEditDlgComponent, { items, type });
	}

	openNewContactDlg(data: { isNewContact?: boolean, supplier?: Supplier, contactId?: string }) {
		return this.dlgSrv.open(NewContactDlgComponent, data);
	}

	openRefuseReplyDlg(data: { senderName: string, recipientName: string, replyId: ID }) {
		return this.dlgSrv.open(RefuseReplyDlgComponent, data);
	}

	openCreationProductDlg() {
		this.dlgSrv.open(CreationProductDlgComponent).pipe(
			filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
			map((evt: CloseEvent) => evt.data)
		).subscribe(({ product }) => {
			this.router.navigate([ERM.PRODUCT.destUrl, product.id]);
		});
	}

	openCreationTaskDlg() {
		this.dlgSrv.open(CreationTaskDlgComponent);
	}

	close() {
		this.dlgSrv.close();
	}

}
