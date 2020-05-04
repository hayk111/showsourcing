import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { TrackingComponent } from '~utils/tracking-component';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SelectionService, ListHelperService } from '~core/list-page2';
import { RatingService } from '~shared/rating/services/rating.service';
import { Product, ApiService } from '~core/erm3';
import { forkJoin } from 'rxjs';

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
		private listHelper: ListHelperService,
		private ratingSrv: RatingService,
		private apiSrv: ApiService
	) {
		super();
	}

	deleteSelectedProducts() {
		this.listHelper.deleteSelected();
	}

	addProductsToProjects() {
		this.dlgCommonSrv.openSelectionDlg('Project').data$.subscribe(projects => {
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
				if (!this[updateObject.callback])
					throw Error(
						'The mass edit object returned by the dialog should contain a valid callback'
					);
				this[updateObject.callback](updateObject);
			});
	}

	selectorUpdate({ property, value }) {
		this.listHelper.updateSelected({ [property.property]: value.id })
			.subscribe(resp => console.log('resp selector update'));
	}
	stringUpdate({ property, value }) {
		this.listHelper.updateSelected({ [property.property]: value })
			.subscribe(resp => console.log('resp selector update'));
	}

	ratingUpdate({ value }) {
		const products: Product[] = this.selectionSrv.getSelectedValues();
		const updates = products.map(product => {
			this.ratingSrv.starVote(product.votes, value.rating, 'Product:' + product.id, false);
		});
		console.log(updates);
	}

	statusUpdate({ value }) {
		const products = this.selectionSrv.getSelectedValues();
		const updates = products.map(product =>
			this.apiSrv.updateStatus('Product', product.id, value.id)
		);
		forkJoin(updates).subscribe(resp => console.log('resp status updates ', resp));
	}
}
