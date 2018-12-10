import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Product } from '~core/models';

@Component({
	selector: 'selector-product-row-app',
	templateUrl: './selector-product-row.component.html',
	styleUrls: ['./selector-product-row.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorProductRowComponent implements OnInit {

	@Input() product: Product;

	constructor() { }

	ngOnInit() {
	}

}
