import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '~core/models';

@Component({
	selector: 'product-docket-app',
	templateUrl: './product-docket.component.html',
	styleUrls: ['./product-docket.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDocketComponent implements OnInit {
	product: Product;
	constructor() { }

	ngOnInit() {
	}

}
