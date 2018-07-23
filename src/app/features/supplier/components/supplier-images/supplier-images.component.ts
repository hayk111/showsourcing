import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Supplier } from '~models/supplier.model';
import { Product } from '~models';


@Component({
	selector: 'supplier-images-app',
	templateUrl: './supplier-images.component.html',
	styleUrls: ['./supplier-images.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierImagesComponent implements OnInit {
	@Input() supplier: Supplier = {};
	@Input() products: Product[] = [];

	constructor() { }

	ngOnInit() {
	}

	// concatenates (supplier & product from supplier) 's images.
	get images() {
		const images = [...this.supplier.images];
		let index = 0;

		if (!this.products)
			return images;

		while (images.length < 7 && index < this.products.length - 1) {
			images.push(...this.products[index++].images);
		}

		return images;
	}
}
