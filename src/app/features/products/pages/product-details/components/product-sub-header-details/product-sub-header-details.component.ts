import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ERM, Product } from '~models';

@Component({
	selector: 'product-sub-header-details-app',
	templateUrl: './product-sub-header-details.component.html',
	styleUrls: ['./product-sub-header-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSubHeaderDetailsComponent implements OnInit {

	@Input() product: Product;
	@Output() updated = new EventEmitter<Product>();
	@Output() redirect = new EventEmitter<string>();
	@Output() ratingClicked = new EventEmitter<undefined>();

	erm = ERM;

	constructor() { }

	ngOnInit() {
	}

	update(value: any, prop: string) {
		this.updated.emit({ id: this.product.id, [prop]: value });
	}

}
