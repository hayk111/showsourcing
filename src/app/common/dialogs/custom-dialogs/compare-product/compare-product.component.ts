import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { Product, ERM } from '~models';
import { DialogService } from '~shared/dialog/services';
import { StatusSelectorService } from '~shared/status-selector/service/status-selector.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'compare-product-app',
	templateUrl: './compare-product.component.html',
	styleUrls: ['./compare-product.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareProductComponent extends AutoUnsub {
	@Input() products: Product[] = [];

	erm = ERM;

	constructor(
		private dlgSrv: DialogService,
		private statusSelectorSrv: StatusSelectorService) {
		super();
	}

	closeDlg() {
		this.dlgSrv.close();
	}

	updated(entity) {
		this.statusSelectorSrv.updateStatus(entity, this.erm.PRODUCT).subscribe();
	}

	/** Trackby function for ngFor */
	trackByFn(index, product) {
		return product.id;
	}
}
