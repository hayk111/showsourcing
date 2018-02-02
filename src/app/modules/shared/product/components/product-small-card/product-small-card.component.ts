import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Product } from '../../../../store/model/entities/product.model';

@Component({
	selector: 'product-small-card-app',
	templateUrl: './product-small-card.component.html',
	styleUrls: ['./product-small-card.component.scss']
})
export class ProductSmallCardComponent implements OnInit {
	@Input() product: Product;

	constructor() { }

	ngOnInit() {
	}

}
