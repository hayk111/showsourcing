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
} from '~shared/custom-dialog';
import { DialogService } from '~shared/dialog';
import { SelectionService } from '~shared/list-page/selection.service';


@Injectable({ providedIn: 'root' })
export class CommonDialogService {

	/** dialog to edit an item in the list.. (can be overidden)*/
	editDlgComponent = EditionDialogComponent;
	/** dialog to create an entity (can be overidden) */
	createDlgComponent = CreationDialogComponent;

	constructor(
		private dlgSrv: DialogService,
		private moduleRef: NgModuleRef<any>,
		private selectionSrv: SelectionService,
		@Optional() @Inject(ERM_TOKEN) private entityMetadata: EntityMetadata
	) { }

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
	openAddToProjectDialog(product: Product) {
		this.dlgSrv.openFromModule(ProductAddToProjectDlgComponent, this.moduleRef, {
			selectedProducts: product ? [product] : this.getSelectionValues()
		});
	}

	/** Opens a dialog that lets the user export a product either in PDF or EXCEL format */
	openExportDialog(product: Product) {
		this.dlgSrv.openFromModule(ProductExportDlgComponent, this.moduleRef, {
			selectedProducts: product ? [product] : this.getSelectionValues()
		});
	}

	/** Opens a dialog that lets the user request members of his team for feedback regarding the products he selectioned */
	openRequestFeedbackDialog(product: Product) {
		this.dlgSrv.openFromModule(ProductRequestTeamFeedbackDlgComponent, this.moduleRef, {
			selectedProducts: product ? [product] : this.getSelectionValues()
		});
	}

	/** Opens a dialog that lets the user compare quotation between products */
	openCompareQuotationDialog() {
		this.dlgSrv.openFromModule(CompareQuotationComponent, this.moduleRef, {
			products: this.getSelectionValues()
		});
	}

	openRequestQuotationDialog(product: Product) {
		this.dlgSrv.openFromModule(RfqDialogComponent, this.moduleRef, { product });
	}

	private getSelectionValues() {
		return this.selectionSrv.getSelectionValues();
	}

	private getSelectionIds() {
		return this.selectionSrv.getSelectionIds();
	}

}
