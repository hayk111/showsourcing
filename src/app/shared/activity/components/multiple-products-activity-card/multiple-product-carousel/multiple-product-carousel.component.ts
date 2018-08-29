import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '~models';

@Component({
	selector: 'multiple-product-carousel-app',
	templateUrl: './multiple-product-carousel.component.html',
	styleUrls: ['./multiple-product-carousel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleProductCarouselComponent implements OnInit {

	@Input() products: Product[];
	@Output() onViewProduct = new EventEmitter<Product>();

	constructor() { }

	ngOnInit() {
	}

}
