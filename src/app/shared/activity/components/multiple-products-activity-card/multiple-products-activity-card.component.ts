import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '~models';

@Component({
	selector: 'multiple-products-activity-card-app',
	templateUrl: './multiple-products-activity-card.component.html',
	styleUrls: ['./multiple-products-activity-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleProductsActivityCardComponent implements OnInit {
	@Input() products: Product[] = [];
	@Input() time: Date;
	@Output() viewProducts = new EventEmitter<Product[]>();
	constructor() { }

	ngOnInit() {
	}

	get firstFour() {
		return this.products.slice(0, 4);
	}

}
