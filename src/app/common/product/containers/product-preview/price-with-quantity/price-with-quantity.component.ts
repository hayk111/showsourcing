import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Price, Product } from '~models';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'price-with-quantity-app',
	templateUrl: './price-with-quantity.component.html',
	styleUrls: ['./price-with-quantity.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceWithQuantityComponent extends TrackingComponent {

	@Input() product: Product;

	@Output() closed = new EventEmitter();
	@Output() updatePrice = new EventEmitter<Price>();

	constructor() {
		super();
	}

	updateProductPrice(isCancel: boolean, newValue: Price, field = 'price') {
		if (!isCancel && this.updatePrice) {
			this.updatePrice.emit(newValue);
		}
	}
}
