import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '~app/entity';

@Component({
	selector: 'product-top-bar-app',
	templateUrl: './product-top-bar.component.html',
	styleUrls: ['./product-top-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductTopBarComponent implements OnInit {
	@Input() product: Product;
	@Input() numTasks;
	@Output() updateStatus = new EventEmitter<string>();
	constructor() { }

	ngOnInit() { }
}
