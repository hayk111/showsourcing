import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { TrackingComponent } from '~utils/tracking-component';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SelectionService, ListHelperService } from '~core/list-page2';

@Component({
	selector: 'product-selection-bar-app',
	templateUrl: './product-selection-bar.component.html',
	styleUrls: ['./product-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSelectionBarComponent extends TrackingComponent {

	constructor(
		private dlgCommonSrv: DialogCommonService,
		private selectionSrv: SelectionService,
		private listHelper: ListHelperService
	) {
		super();
	}

	deleteSelectedProducts() {
		this.listHelper.deleteSelected();
	}

	addProductsToProjects() {
		this.dlgCommonSrv.openSelectionDlg('Project').data$.subscribe((projects) => {
			// Add projects
		});
	}

	exportProducts() {
		// this.dlgCommonSrv.openExportDialog('Product', this.selectionSrv.getSelectedValues()).data$.subscribe(/* ... */);
	}

	createRequest() {
		// this.dlgCommonSrv.openSupplierRequest(this.selectionSrv.getSelectedValues() as any).data$.subscribe(/* ... */);
	}

	requestTeamFeedback() {
		// this.dlgCommonSrv.openRequestFeedbackDialog(this.selectionSrv.getSelectedValues() as any).data$.subscribe(/* ... */);
	}

	archiveProducts() {
		// this.listHelper.archiveMany(this.selectionSrv.getSelectedValues() as any);
	}

	compareProducts() {
		this.dlgCommonSrv
			.openCompareProductDialog(this.selectionSrv.getSelectedValues() as any)
			.data$.subscribe(/* ... */);
	}

	massEdit() {
		this.dlgCommonSrv
			.openMassEditDialog(this.selectionSrv.getSelectedValues(), 'Product')
			.data$.subscribe(updateObject => {
				console.log('trigger update function : ', updateObject);
			});
	}

}
