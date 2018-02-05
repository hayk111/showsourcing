import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../../store/model/entities/product.model';

@Component({
	selector: 'product-sub-info-app',
	templateUrl: './product-sub-info.component.html',
	styleUrls: ['./product-sub-info.component.scss']
})
export class ProductSubInfoComponent implements OnInit {
	@Input() product: Product;
	@Input() big = false;
	constructor() { }

	ngOnInit() {
	}

}
