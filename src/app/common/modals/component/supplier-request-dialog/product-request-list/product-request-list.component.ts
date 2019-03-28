import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '~core/models';
import { ID } from '~utils';

@Component({
	selector: 'product-request-list-app',
	templateUrl: './product-request-list.component.html',
	styleUrls: ['./product-request-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductRequestListComponent implements OnInit {

	@Input() products: Product[];
	@Output() remove = new EventEmitter<ID>();

	constructor() { }

	ngOnInit() {
	}

}
