import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Product } from '../../../../store/model/entities/product.model';

@Component({
	selector: 'app-product-small-card',
	templateUrl: './product-small-card.component.html',
	styleUrls: ['./product-small-card.component.scss']
})
export class ProductSmallCardComponent implements OnInit {
	@HostBinding('class.card') card = true;
	@Input() product: Product;

	constructor() { }

	ngOnInit() {
	}

}
