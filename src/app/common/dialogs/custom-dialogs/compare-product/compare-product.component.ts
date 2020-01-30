import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProductService } from '~core/erm/services';
import { ERM, Product } from '~core/erm/models';
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

	erm = ERM;

	constructor(
		private dlgSrv: DialogService,
		private productSrv: ProductService) {
		super();
	}

	closeDlg() {
		this.dlgSrv.close();
	}

	updated(product: Product) {
		this.productSrv.update(product).subscribe();
	}

	/** Trackby function for ngFor */
	trackByFn(index, product) {
		return product.id;
	}
}
