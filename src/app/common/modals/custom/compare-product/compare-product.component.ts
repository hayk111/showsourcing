import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '~models';
import { DialogService } from '~shared/dialog/services';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'compare-product-app',
	templateUrl: './compare-product.component.html',
	styleUrls: ['./compare-product.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompareProductComponent extends AutoUnsub {
	@Input() products: Product[] = [];

	constructor(
		private dlgSrv: DialogService) {
		super();
	}

	closeDlg() {
		this.dlgSrv.close();
	}

	/** Trackby function for ngFor */
	trackByFn(index, product) {
		return product.id;
	}
}
