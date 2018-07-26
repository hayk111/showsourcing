import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '~models';

@Component({
	selector: 'one-product-activity-card-app',
	templateUrl: './one-product-activity-card.component.html',
	styleUrls: ['./one-product-activity-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneProductActivityCardComponent implements OnInit {
	@Input() product: Product;
	@Output() update = new EventEmitter<Product>();
	constructor() { }

	ngOnInit() {
	}

	hasThreeImages() {
		return this.product.images && this.product.images[2];
	}

	onFavorite() {
		this.update.emit({ id: this.product.id, favorite: true });
	}

	onUnfavorite() {
		this.update.emit({ id: this.product.id, favorite: false });
	}


}
