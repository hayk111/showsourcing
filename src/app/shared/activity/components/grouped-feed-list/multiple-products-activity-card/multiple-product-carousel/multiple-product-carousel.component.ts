import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '~models';

@Component({
	selector: 'multiple-product-carousel-app',
	templateUrl: './multiple-product-carousel.component.html',
	styleUrls: ['./multiple-product-carousel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleProductCarouselComponent implements OnInit {

	@Input() products: Product[];
	@Input() selectedIndex = 0;
	@Output() update = new EventEmitter<Product>();
	@Output() liked = new EventEmitter<Product>();
	@Output() disliked = new EventEmitter<Product>();

	constructor() { }

	ngOnInit() {
	}

	updateProduct(prod: Product, fields) {
		this.update.emit({ id: prod.id, ...fields });
	}

	back(event) {
		if (this.selectedIndex > 0)
			this.selectedIndex--;
		event.stopPropagation();

	}

	next(event) {
		if (this.selectedIndex < this.products.length - 1)
			this.selectedIndex++;
		event.stopPropagation();
	}

}
