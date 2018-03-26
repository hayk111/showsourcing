import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Product } from '~app/features/products';

@Component({
	selector: 'supplier-latest-products-app',
	templateUrl: './supplier-latest-products.component.html',
	styleUrls: ['./supplier-latest-products.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierLatestProductsComponent implements OnInit {
	@Input() products: Array<Product>;
	constructor() { }

	ngOnInit() {
	}

}
