import { Component, OnInit, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '~models';
import { DEFAULT_PRODUCT_IMG } from '~utils/constants';

@Component({
	selector: 'product-small-card-app',
	templateUrl: './product-small-card.component.html',
	styleUrls: ['./product-small-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSmallCardComponent implements OnInit {
	@Input() product: Product;
	defaultImg = DEFAULT_PRODUCT_IMG;

	constructor() { }

	ngOnInit() { }
}
