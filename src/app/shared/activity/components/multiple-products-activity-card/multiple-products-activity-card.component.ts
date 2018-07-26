import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '~models';
import { Router } from '@angular/router';

@Component({
	selector: 'multiple-products-activity-card-app',
	templateUrl: './multiple-products-activity-card.component.html',
	styleUrls: ['./multiple-products-activity-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleProductsActivityCardComponent implements OnInit {
	@Input() products: Product[] = [];
	@Input() time: Date;
	constructor(private router: Router) { }

	ngOnInit() {

	}

	get firstFour() {
		return this.products.slice(0, 4);
	}

	goToProduct(product: Product) {
		this.router.navigate(['product', 'details', product.id ]);
	}

}
