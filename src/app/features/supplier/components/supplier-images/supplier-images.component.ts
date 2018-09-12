import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Supplier } from '~models/supplier.model';
import { Product } from '~models';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';


@Component({
	selector: 'supplier-images-app',
	templateUrl: './supplier-images.component.html',
	styleUrls: ['./supplier-images.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierImagesComponent extends TrackingComponent implements OnInit {
	@Input() supplier: Supplier = {};
	@Input() products: Product[] = [];
	modalOpen = false;
	// index for modal when clicking on a picture
	selectedIndex = 0;
	// max number of images displayed
	private readonly MAX_NUMBER_OF_IMAGES = 6;

	constructor() {
    super();
  }

	ngOnInit() {
	}

	// concatenates (supplier & product from supplier) 's images.
	get images() {
		const images = [...this.supplier.images];
		let index = 0;

		if (!this.products)
			return images;

		while (images.length <= this.MAX_NUMBER_OF_IMAGES && index < this.products.length - 1) {
			images.push(...this.products[index++].images);
		}

		return images.slice(0, this.MAX_NUMBER_OF_IMAGES);
	}

	openModal(index: number) {
		this.selectedIndex = index;
		this.modalOpen = true;
	}

	closeModal() {
		this.modalOpen = false;
	}
}
