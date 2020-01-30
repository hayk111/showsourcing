import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '~core/erm/services';
import { Product } from '~core/erm/models';
import { TrackingComponent } from '~utils';
import { Router } from '@angular/router';

@Component({
	selector: 'products-card-app',
	templateUrl: './products-card.component.html',
	styleUrls: ['./products-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsCardComponent extends TrackingComponent {

	@Input() products: Product[];
	@Output() addProducts = new EventEmitter<undefined>();
	@Output() viewAll = new EventEmitter<undefined>();

	previewOpen = false;
	previewProduct: Product;

	constructor(
		private productSrv: ProductService,
		private router: Router
	) { super(); }


	update(product: Product) {
		this.productSrv.update(product).subscribe();
	}

	openPreview(product: Product) {
		this.previewProduct = product;
		this.previewOpen = true;
	}

	closePreview() {
		this.previewOpen = false;
		this.previewProduct = null;
	}

	openProduct(product: Product) {
		this.router.navigate(['products', product.id]);
	}

}
