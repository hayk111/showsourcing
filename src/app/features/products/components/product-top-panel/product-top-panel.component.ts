import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '~models/product.model';
import { ERM } from '~models/_erm.enum';

@Component({
	selector: 'product-top-panel-app',
	templateUrl: './product-top-panel.component.html',
	styleUrls: ['./product-top-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductTopPanelComponent implements OnInit {
	@Input() product: Product;
	@Output() deleteProduct = new EventEmitter<Product>();
	@Output() update = new EventEmitter<Product>();
	productEntity = ERM.PRODUCT;
	constructor() { }

	ngOnInit() {
	}

	onFavorited(product: Product) {
		this.update.emit({ id: this.product.id, favorite: true });
	}

	onUnfavorited(product: Product) {
		this.update.emit({ id: this.product.id, favorite: false });
	}

}
