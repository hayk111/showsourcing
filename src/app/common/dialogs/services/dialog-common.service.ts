import { Injectable } from '@angular/core';
import { error } from 'util';

import {
	CompareProductComponent,
	EditionDialogComponent,
	ExportDialogComponent,
	InviteUserDlgComponent,
	MassEditDialogComponent,
	MergeDialogComponent,
	NewContactDlgComponent,
	ProductRequestTeamFeedbackDlgComponent,
	RefuseReplyDlgComponent,
	VoteDetailsDialogComponent,
	TemplateMngmtDlgComponent,
	DescriptionDlgComponent
} from '~common/dialogs/custom-dialogs';
import { EntityMetadata, Product, Supplier, RequestTemplate } from '~core/erm';
import { Entity } from '~core/erm3/models/_entity.model';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { DialogService } from '~shared/dialog/services';
import { Vote } from '~core/erm3/models';
import { ID } from '~utils';
import { ReviewRequestReplyDlgComponent } from '../custom-dialogs/review-request-reply-dlg/review-request-reply-dlg.component';
import { SupplierRequestDialogComponent } from '../custom-dialogs/supplier-request-dialog/supplier-request-dialog.component';
import {
	ProductCreationDialogComponent,
	DefaultCreationDialogComponent,
	TaskCreationDialogComponent,
	SampleCreationDialogComponent
} from '~common/dialogs/creation-dialogs';
import { ProductSelectionDialogComponent, ProjectSelectionDialogComponent } from '~common/dialogs/selection-dialogs';
import { Typename } from 'showsourcing-api-lib';

/**
 * Service used to open dialogs, the goal of this service is to bring easy typing
 * for data in dialog as well as to relieve the imports of the dlg components
 * which might bring some circular dependencies from time to time
 */
@Injectable({ providedIn: 'root' })
export class DialogCommonService {
	constructor(private dlgSrv: DialogService) {}

	/**
	 * Open a dialog to get datas for create an entity.
	 * @param typename: should be an Entity who have a CreationDialog. If not, the DefaultCreationDialog will be used (to get the name)
	 * @param linkedEntities: the params values for the dialog component. e.g. {product: Product}
	 * @returns DialogRef: an object of observables who stream $close, $data, $cancel.
	 */
	openCreationDlg(typename: Typename, linkedEntities?: Record<string, Entity>) {
		// dialogs disponibles from imports
		const creationDialogs: Partial<Record<Typename, any>> = {
			Product: ProductCreationDialogComponent,
			Sample: SampleCreationDialogComponent,
			Task: TaskCreationDialogComponent
		};

		let dlgComponent = creationDialogs[typename];
		if (!dlgComponent) dlgComponent = DefaultCreationDialogComponent;
		return this.dlgSrv.open(dlgComponent, { typename, ...linkedEntities });
	}

	/**
	 * Open a dialog to select some entities through a table
	 * @param typename: should be Product | Project
	 * @param initialSelecteds: the initial entities selecteds in the table
	 * @returns DialogRef: an object of observables who stream $close, $data, $cancel.
	 */
	openSelectionDlg(typename: Typename, additionalFields?: any) {
		// dialogs disponibles from imports
		const selectionDialogs: Partial<Record<Typename, any>> = {
			Product: ProductSelectionDialogComponent,
			Project: ProjectSelectionDialogComponent
		};

		const dlgComponent = selectionDialogs[typename];
		if (!dlgComponent) throw error(`There is no Selection Dialog for the typename: ${typename}`);
		return this.dlgSrv.open(dlgComponent, { ...additionalFields });
	}

	/** opens the edit dialog, to change the name of an entity, if the enitty does not have a name attribute check Event model for example*/
	openEditDlg(entity: any, entityMetadata: EntityMetadata) {
		return this.dlgSrv.open(EditionDialogComponent, { entity, type: entityMetadata });
	}

	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	// TODO type this function when migrating it
	openExportDlg(typename: Typename, targets?: any[], query?: any) {
		return this.dlgSrv.open(ExportDialogComponent, { typename, targets, query });
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog(products?: Product[]) {
		return this.dlgSrv.open(ProductRequestTeamFeedbackDlgComponent, { products });
	}

	openCompareProductDialog(products: Product[]) {
		return this.dlgSrv.open(CompareProductComponent, { products });
	}

	openConfirmDlg(data: Partial<{ title: string, text: string, subText: string, action: string}>) {
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

	openMassEditDialog(items: any[], typename: Typename) {
		return this.dlgSrv.open(MassEditDialogComponent, { items, typename });
	}

	openNewContactDlg(supplier?: Supplier, isNewContact: boolean = true, contactId?: string) {
		return this.dlgSrv.open(NewContactDlgComponent, { isNewContact, supplier, contactId });
	}

	openRefuseReplyDlg(data: { senderName: string; recipientName: string; replyId: ID }) {
		return this.dlgSrv.open(RefuseReplyDlgComponent, data);
	}

	openSupplierRequest(products: Product[], supplier?: Supplier) {
		return this.dlgSrv.open(SupplierRequestDialogComponent, { products, supplier });
	}

	openTemplateMngmtDlg(templateSelected: RequestTemplate) {
		return this.dlgSrv.open(TemplateMngmtDlgComponent, {template: {templateSelected}});
	}

	openDescriptionDlg(data) {
		return this.dlgSrv.open(DescriptionDlgComponent, data);
	}

	close() {
		this.dlgSrv.close();
	}
}
