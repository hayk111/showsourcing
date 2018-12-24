import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Product } from '~core/models';

@Component({
	selector: 'product-grid-card2-app',
	templateUrl: './product-grid-card2.component.html',
	styleUrls: ['./product-grid-card2.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductGridCard2Component implements OnInit {

	@Input() product: Product;

	constructor() { }

	ngOnInit() {
	}

}
