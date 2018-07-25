import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '~models';

@Component({
	selector: 'app-product-grid-card',
	templateUrl: './product-grid-card.component.html',
	styleUrls: ['./product-grid-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductGridCardComponent implements OnInit {

	@Input() product: Product;
	@Input() selected: boolean;
	@Output() productSelect = new EventEmitter<string>();
	@Output() productUnselect = new EventEmitter<string>();
	@Output() productFavorite = new EventEmitter<string>();
	@Output() productUnFavorite = new EventEmitter<string>();
	@Output() productLike = new EventEmitter<string>();
	@Output() productDislike = new EventEmitter<string>();

	constructor() { }

	ngOnInit() {
	}

}
