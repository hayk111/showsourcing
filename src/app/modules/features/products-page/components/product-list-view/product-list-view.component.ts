import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Supplier } from '../../../../store/model/supplier.model';
import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { EntityState, entityStateToArray } from '../../../../store/utils/entities.utils';
import { Product } from '../../../../store/model/product.model';
import { selectSuppliers } from '../../../../store/selectors/suppliers.selector';
import { selectProductsWithNames } from '../../../../store/selectors/products.selector';

@Component({
	selector: 'product-list-view-app',
	templateUrl: './product-list-view.component.html',
	styleUrls: ['./product-list-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListViewComponent implements OnInit {
	@Output() itemClicked = new EventEmitter<string>();
	suppliers$: Observable<EntityState<Supplier>>;
	products$: Observable<any>;
	columns = [
		{ name: 'Name', prop: 'name' },
		{ name: 'Category', prop: 'categoryName' },
		{ name: 'Supplier', prop: 'supplierName' },
		{ name: 'Event', prop: 'eventName' },
		{ name: 'Price', prop: 'priceAmount' },
		{ name: 'Rating', prop: 'rating' },
	];

	constructor(private store: Store<any>) {
		this.products$ = this.store.select(selectProductsWithNames);
	}

	ngOnInit() {
	}

	onSelect(event) {
		if (event.type === 'click')
			this.itemClicked.emit(event.row.id);
	}

}
