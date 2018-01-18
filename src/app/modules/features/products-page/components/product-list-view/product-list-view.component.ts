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
import { FilterActions } from '../../../../store/action/filter.action';
import { FilterGroupName } from '../../../../store/model/filter.model';

@Component({
	selector: 'product-list-view-app',
	templateUrl: './product-list-view.component.html',
	styleUrls: ['./product-list-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListViewComponent implements OnInit {
	@Output() itemSelected = new EventEmitter<string>();
	@Input() filterGroupName: FilterGroupName;
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
		if (event.type === 'click' || event.type === 'keydown') {
			this.itemSelected.emit(event.row.id);
		}
	}

	onSort(event) {
		// const sortOrder = event.newValue;
		// const value = event.column.prop;
		// const repr = filterRepresentationMap.sortByProduct;
		// const name = `sort by ${event.column.prop}`;
		// this.store.dispatch(FilterActions.removeFiltersForFilterReprs(this.filterGroupName, [repr]));
		// this.store.dispatch(FilterActions.addFilter(this.filterGroupName, repr, name, value));
	}

}
