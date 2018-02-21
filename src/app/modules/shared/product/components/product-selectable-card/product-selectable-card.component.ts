import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../../products';
import { DEFAULT_NO_IMG } from '../../../../../utils/constants.const';

@Component({
	selector: 'product-selectable-card-app',
	templateUrl: './product-selectable-card.component.html',
	styleUrls: ['./product-selectable-card.component.scss']
})
export class ProductSelectableCardComponent implements OnInit {
	@Input() product: Product;
	@Input() selected: boolean;
	@Output() productSelect = new EventEmitter<string>();
	@Output() productUnselect = new EventEmitter<string>();
	@Output() productOpen = new EventEmitter<string>();
	@Output() productFavorited = new EventEmitter<string>();
	@Output() productUnfavorited = new EventEmitter<string>();
	@Output() productVote = new EventEmitter<{ id: string; value: number }>();

	constructor() {}

	ngOnInit() {}

	onRateClick() {
		if (this.product.rating === 5) this.productUnfavorited.emit(this.product.id);
		else this.productFavorited.emit(this.product.id);
	}

	onVote(value) {
		this.productVote.emit({ id: this.product.id, value });
	}
}
