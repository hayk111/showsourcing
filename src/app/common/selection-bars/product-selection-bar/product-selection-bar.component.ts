import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { Product } from '~core/erm3';
import { ListHelper2Service, SelectionService } from '~core/list-page2';
import { RatingService } from '~shared/rating/services/rating.service';
import { StatusSelectorService } from '~shared/status-selector/service/status-selector.service';
import { Toast, ToastService, ToastType } from '~shared/toast';
import { translate } from '~utils';
import { TrackingComponent } from '~utils/tracking-component';


@Component({
	selector: 'product-selection-bar-app',
	templateUrl: './product-selection-bar.component.html',
	styleUrls: ['./product-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSelectionBarComponent extends TrackingComponent {
	@Input() projectProductSelection = false;

	@Output() removeProjectProducts = new EventEmitter<Product[]>();

	massUpdateToast: Toast = {
		title: translate('multiple-edition'),
		message: translate('your-items-updated'),
		type: ToastType.SUCCESS
	};

	constructor(
		private dlgCommonSrv: DialogCommonService,
		private selectionSrv: SelectionService,
		private listHelper: ListHelper2Service,
		private ratingSrv: RatingService,
		private notificationSrv: ToastService,
		private statusSrv: StatusSelectorService
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

	removeFromProject() {
		this.removeProjectProducts.emit(this.selectionSrv.getSelectedValues() as any);
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
				// selectorUpdate, stringUpdate, ratingUpdate, statusUpdate, ...
				this[updateObject.callback](updateObject);
			});
	}

	selectorUpdate({ property, value }) {
		this.listHelper.updateSelected({ [property.property]: value.id }).subscribe(resp => {
			this.notificationSrv.add(this.massUpdateToast);
		});
	}
	stringUpdate({ property, value }) {
		this.listHelper.updateSelected({ [property.property]: value }).subscribe(resp => {
			this.notificationSrv.add(this.massUpdateToast);
		});
	}

	ratingUpdate({ value }) {
		const products: Product[] = this.selectionSrv.getSelectedValues() as any;
		// TODO starVote should return an observable to do action after BE response
		const updates = products.map(product => {
			// return this.ratingSrv.starVote(product.votes, value.rating, 'Product:' + product.id, false);
		});
	}

	statusUpdate({ value }) {
		const products = this.selectionSrv.getSelectedValues();
		// const updates = products.map(product =>
			// this.statusSrv.setupStatuses()
			// this.statusSrv.updateStatus()
		// );
		// forkJoin(updates).subscribe(resp => {
			// this.notificationSrv.add(this.massUpdateToast);
		// });
	}
}
