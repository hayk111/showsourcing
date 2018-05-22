import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Product } from '~models';

import { Observable } from 'rxjs';

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
