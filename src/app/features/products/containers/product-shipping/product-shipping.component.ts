import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'product-shipping-app',
	templateUrl: './product-shipping.component.html',
	styleUrls: ['./product-shipping.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductShippingComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
