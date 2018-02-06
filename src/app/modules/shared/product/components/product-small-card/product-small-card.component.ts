import { Component, OnInit, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../../../../store/model/entities/product.model';

@Component({
	selector: 'product-small-card-app',
	templateUrl: './product-small-card.component.html',
	styleUrls: ['./product-small-card.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSmallCardComponent implements OnInit {
	@Input() product: Product;
	DEFAULT_IMAGE = 'https://www.tematicaresearch.com/wp-content/themes/linstar/assets/images/default.jpg';

	constructor() { }

	ngOnInit() {
	}

}
