import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Product, ERM } from '~core/models';

@Component({
	selector: 'product-docket-app',
	templateUrl: './product-docket.component.html',
	styleUrls: ['./product-docket.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDocketComponent implements OnInit {
	@Input() product: Product;
	@Output() update = new EventEmitter<Product>();
	@Output() addTask = new EventEmitter<undefined>();
	@Output() addSample = new EventEmitter<undefined>();
	erm = ERM;
	constructor() { }

	ngOnInit() {
	}

}
