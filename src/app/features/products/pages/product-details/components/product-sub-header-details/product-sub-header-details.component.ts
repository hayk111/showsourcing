import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ERM, Product } from '~models';
import { ProductService } from '~core/entity-services';

@Component({
	selector: 'product-sub-header-details-app',
	templateUrl: './product-sub-header-details.component.html',
	styleUrls: ['./product-sub-header-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSubHeaderDetailsComponent implements OnInit {

	@Input() product: Product;

	erm = ERM;

	constructor(private productSrv: ProductService) { }

	ngOnInit() {
	}

	updateProduct(product: Product) {
		this.productSrv.update({ id: product.id, ...product }).subscribe();
	}

	update(prop: string, value: any) {
		this.updateProduct({ [prop]: value });
	}

}
