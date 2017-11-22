import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'product-card-view-app',
	templateUrl: './product-card-view.component.html',
	styleUrls: ['./product-card-view.component.scss']
})
export class ProductCardViewComponent implements OnInit {
	@Input() products = [];
	suppliers$;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.suppliers$ = this.store.select('suppliers');
	}

}
