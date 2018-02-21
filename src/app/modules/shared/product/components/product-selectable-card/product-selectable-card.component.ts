import { Component, OnInit, Input } from '@angular/core';
import { DEFAULT_NO_IMG } from '../../../../../utils/constants.const';
import { Product } from '../../../../products';
@Component({
	selector: 'product-selectable-card-app',
	templateUrl: './product-selectable-card.component.html',
	styleUrls: ['./product-selectable-card.component.scss']
})
export class ProductSelectableCardComponent implements OnInit {
	@Input() product: Product;
	constructor() {}

	ngOnInit() {}
}
