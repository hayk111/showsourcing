import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Product } from '~app/features/products';

import { selectProductFocused } from './../../store/product.selector';

@Component({
	selector: 'product-general-info-app',
	templateUrl: './product-general-info.component.html',
	styleUrls: ['./product-general-info.component.scss'],
})
export class ProductGeneralInfoComponent implements OnInit {
	product$: Observable<Product>;
	constructor(private store: Store<any>) {}

	ngOnInit() {
		this.product$ = this.store.select(selectProductFocused);
	}
}
