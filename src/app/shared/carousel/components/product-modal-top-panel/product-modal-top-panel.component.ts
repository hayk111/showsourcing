import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '~models/product.model';
import { ERM } from '~models/_erm.enum';

@Component({
	selector: 'product-modal-top-panel',
	templateUrl: './product-modal-top-panel.component.html',
	styleUrls: ['./product-modal-top-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewTopPanelComponent implements OnInit {
	@Input() product: Product;
	@Input() selectedIndex: number;
	@Output () delete = new EventEmitter<Product>();
	@Output () close = new EventEmitter<any>();
	@Output() openFileBrowser = new EventEmitter<void>();
	productEntity = ERM.PRODUCT;

	constructor() { }

	ngOnInit() {
	}

	getImg() {
		return this.product.images ? this.product.images[this.selectedIndex] : null;
	}
}
