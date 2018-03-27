import { Component, OnInit, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '~product';
import { DEFAULT_NO_IMG } from '~utils/constants.const';

@Component({
	selector: 'product-small-card-app',
	templateUrl: './product-small-card.component.html',
	styleUrls: ['./product-small-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSmallCardComponent implements OnInit {
	@Input() product: Product;
	DEFAULT_IMAGE = DEFAULT_NO_IMG;

	constructor() { }

	ngOnInit() { }
}
