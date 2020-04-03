import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { error } from 'util';

import * as creationDialogs from '~common/dialogs/creation-dialogs';
import * as selectionDialogs from '~common/dialogs/selection-dialogs';

import {
	CompareProductComponent,
	EditionDialogComponent,
	ExportDlgComponent,
	InviteUserDlgComponent,
	MassEditDlgComponent,
	MergeDialogComponent,
	NewContactDlgComponent,
	ProductRequestTeamFeedbackDlgComponent,
	RefuseReplyDlgComponent,
	VoteDetailsDialogComponent
} from '~common/dialogs/custom-dialogs';
import { EntityMetadata, Product, Supplier } from '~core/erm';
import { Entity } from '~core/erm3/models/_entity.model';
import { Typename } from '~core/erm3/typename.type';
import { CloseEvent, CloseEventType } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { DialogService } from '~shared/dialog/services';
import { Vote } from '~shared/rating/services/rating.service';
import { ID } from '~utils';
import { ReviewRequestReplyDlgComponent } from '../custom-dialogs/review-request-reply-dlg/review-request-reply-dlg.component';
import { SupplierRequestDialogComponent } from '../custom-dialogs/supplier-request-dialog/supplier-request-dialog.component';

/**
 * Service used to open dialogs, the goal of this service is to bring easy typing
 * for data in dialog as well as to relieve the imports of the dlg components
 * which might bring some circular dependencies from time to time
 */
@Injectable({ providedIn: 'root' })
export class DialogCommonService {
	constructor(private dlgSrv: DialogService) {}

	// /** opens the create dialog,
	//  * @param shouldRedirect whether we redirect after creation to entityMetadata.createUrl
	//  * if its truem otherwise it will stay on the same page
	//  */
	// openCreateDlg(typename: Typename, shouldRedirect: boolean = false) {
	// 	return this.dlgSrv.open(CreationDialogComponent, { shouldRedirect, typename });
	// }

	openCreationDlg(typename?: Typename, linkedEntities?: Object) {
		// find the correct TypenameSelectionDialogComponent from the imports. if undefined, use the default
		let dlgComponent = creationDialogs[`${typename}CreationDialogComponent`];
		if (!dlgComponent) dlgComponent = creationDialogs.DefaultCreationDialogComponent;
		return this.dlgSrv.open(dlgComponent, {typename, ...linkedEntities});
	}
	// /** old creation : */
	// /** @deprecated: use openCreationDlg instead */
	// openCreationProductDlg() {}
	// /** @deprecated: use openCreationDlg instead */
	// openCreationSampleDialog(product?: Product, supplier?: Supplier) {
	// 	return this.dlgSrv
	// 		.open(CreationSampleDlgComponent, { product, supplier })
	// 		.pipe(filter((event: CloseEvent) => event.type === CloseEventType.OK));
	// }
	// /** @deprecated: use openCreationDlg instead */
	// openCreationTaskDlg(product?: Product, supplier?: Supplier) {
	// 	return this.dlgSrv
	// 		.open(CreationTaskDlgComponent, { product, supplier })
	// 		.pipe(filter((event: CloseEvent) => event.type === CloseEventType.OK));
	// }
	// // TAG : default creationDlg
	// // CATEGORY : default creationDlg
	// // SUPPLIER : default creationDlg

	/**
	 * Open a dialog for select some entities through a table
	 * @param typename: should be Product | Project
	 * @returns an observable who stream CloseEvent, with selecteds if close is OK
	 */
	openSelectionDlg<T extends Entity>(typename: Typename, initialSelecteds?: T[]) {
		// find the correct TypenameSelectionDialogComponent from the imports
		const dlgComponent = selectionDialogs[`${typename}SelectionDialogComponent`];
		if (!dlgComponent) throw error(`There is no Selection Dialog for the typename: ${typename}`);
		return this.dlgSrv.open(dlgComponent, { initialSelecteds });
	}

	/** opens the edit dialog, to change the name of an entity, if the enitty does not have a name attribute check Event model for example*/
	openEditDlg(entity: any, entityMetadata: EntityMetadata) {
		return this.dlgSrv.open(EditionDialogComponent, { entity, type: entityMetadata });
	}

	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	// TODO type this function when migrating it
	openExportDialog(typename: any, targets?: any[], query?: string) {
		return this.dlgSrv.open(ExportDlgComponent, { typename, targets, query });
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog(products?: Product[]) {
		return this.dlgSrv.open(ProductRequestTeamFeedbackDlgComponent, { products });
	}

	openCompareProductDialog(products: Product[]) {
		return this.dlgSrv.open(CompareProductComponent, { products });
	}

	openConfirmDialog(data: { text: string }) {
		return this.dlgSrv.open(ConfirmDialogComponent, data);
	}

	openMergeDialog(data: { type: any; entities: any[] }) {
		return this.dlgSrv.open(MergeDialogComponent, data);
	}

	openInvitationDialog() {
		return this.dlgSrv.open(InviteUserDlgComponent);
	}

	openReviewRequestReplyDlg(data: { elementId: ID; selectedIndex: number; requestId: ID }) {
		return this.dlgSrv.open(ReviewRequestReplyDlgComponent, data);
	}

	/** Opens a dialog that let you see the list of people who have voted */
	openVoteDetailsDialog(votes: Vote[]) {
		return this.dlgSrv.open(VoteDetailsDialogComponent, { votes });
	}

	openMassEditDialog(items: any[], type: EntityMetadata) {
		return this.dlgSrv.open(MassEditDlgComponent, { items, type });
	}

	openNewContactDlg(supplier?: Supplier, isNewContact: boolean = true, contactId?: string) {
		return this.dlgSrv.open(NewContactDlgComponent, { isNewContact, supplier, contactId });
	}

	openRefuseReplyDlg(data: { senderName: string; recipientName: string; replyId: ID }) {
		return this.dlgSrv.open(RefuseReplyDlgComponent, data);
	}

	openEditionDlg() {}

	openSupplierRequest(products: Product[], supplier?: Supplier) {
		return this.dlgSrv.open(SupplierRequestDialogComponent, { products, supplier });
	}

	close() {
		this.dlgSrv.close();
	}
}
