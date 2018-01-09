import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityState } from '../../../../store/utils/entities.utils';
import { Product } from '../../../../store/model/product.model';
import { selectSuppliers } from '../../../../store/selectors/suppliers.selector';
import { Observable } from 'rxjs/Observable';
import { selectProductByStatus } from '../../../../store/selectors/products.selector';
import { ProductActions } from '../../../../store/action/product.action';

@Component({
	selector: 'product-card-view-app',
	templateUrl: './product-card-view.component.html',
	styleUrls: ['./product-card-view.component.scss']
})
export class ProductCardViewComponent implements OnInit {
	@Output() itemClicked = new EventEmitter<string>();
	productsByStatus$: Observable<Array<any>>;
	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.productsByStatus$ = this.store.select(selectProductByStatus);
	}

	changeStatus(event) {
		this.store.dispatch(ProductActions.patch(event.data, 'status', event.enteringBag));
	}

}
