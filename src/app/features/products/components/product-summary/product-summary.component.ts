import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '~models';

@Component({
	selector: 'product-summary-app',
	templateUrl: './product-summary.component.html',
	styleUrls: ['./product-summary.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSummaryComponent implements OnInit {
	@Input() product: Product;
	@Input() numTasks;
	@Output() updateStatus = new EventEmitter<string>();
	constructor() { }

	ngOnInit() { }
}
