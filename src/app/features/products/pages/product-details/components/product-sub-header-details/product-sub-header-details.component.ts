import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ERM, Product } from '~models';

@Component({
	selector: 'product-sub-header-details-app',
	templateUrl: './product-sub-header-details.component.html',
	styleUrls: ['./product-sub-header-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSubHeaderDetailsComponent implements OnInit {

	@Input() product: Product;

	erm = ERM;

	constructor() { }

	ngOnInit() {
	}

}
