import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityState } from '../../../../store/utils/entities.utils';
import { Product } from '../../../../store/model/product.model';

@Component({
	selector: 'product-card-view-app',
	templateUrl: './product-card-view.component.html',
	styleUrls: ['./product-card-view.component.scss']
})
export class ProductCardViewComponent implements OnInit {
	@Input() productEntities: EntityState<Product>;
	suppliers$;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.suppliers$ = this.store.select('suppliers');
	}

}
