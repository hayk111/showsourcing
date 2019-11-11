import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Product } from '~core/models';

@Component({
	selector: 'product-sub-header-details-app',
	templateUrl: './product-sub-header-details.component.html',
	styleUrls: ['./product-sub-header-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSubHeaderDetailsComponent implements OnInit {

	@Input() product: Product;

	constructor() { }

	ngOnInit() {
	}

}
