import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '~models/product.model';
import { ERM } from '~models/_erm.enum';

@Component({
	selector: 'product-top-panel-app',
	templateUrl: './product-top-panel.component.html',
	styleUrls: ['./product-top-panel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductTopPanelComponent implements OnInit {
	@Input() product: Product;
	@Output() deleteProduct = new EventEmitter<null>();
	productEntity = ERM.PRODUCT;
	// <product-top-panel-app [product]="product$ | async" [title]="" (deleteProduct)="deleteProduct()"
	constructor() { }

	ngOnInit() {
	}

}
