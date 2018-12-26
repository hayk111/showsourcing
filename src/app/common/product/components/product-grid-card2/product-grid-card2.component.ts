import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '~core/models';

@Component({
	selector: 'product-grid-card2-app',
	templateUrl: './product-grid-card2.component.html',
	styleUrls: ['./product-grid-card2.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductGridCard2Component implements OnInit {

	@Input() product: Product;
	@Input() selected: boolean;
	@Input() hasCheckbox = true;
	@Output() open = new EventEmitter<null>();
	@Output() preview = new EventEmitter<null>();
	@Output() select = new EventEmitter<null>();
	@Output() unselect = new EventEmitter<null>();

	constructor() { }

	ngOnInit() {
	}

}
