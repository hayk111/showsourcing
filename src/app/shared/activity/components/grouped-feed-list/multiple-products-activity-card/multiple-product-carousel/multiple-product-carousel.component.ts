import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Product } from '~models';
import { Renderer3 } from '@angular/core/src/render3/interfaces/renderer';

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
