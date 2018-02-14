import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Supplier } from '../../../../store/model/entities/supplier.model';
import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy } from '@angular/core';
import { EntityState, entityStateToArray, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { Product } from '../../../../store/model/entities/product.model';
import { selectSuppliers } from '../../../../store/selectors/entities/suppliers.selector';
import { selectProductsWithNames } from '../../../../store/selectors/entities/products.selector';
import { FilterActions } from '../../../../store/action/misc/filter.action';
import { FilterGroupName, FilterSort } from '../../../../store/model/misc/filter.model';
import { selectEntityArray } from '../../../../store/selectors/misc/utils.selector';

@Component({
	selector: 'product-list-view-app',
	templateUrl: './product-list-view.component.html',
	styleUrls: ['./product-list-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListViewComponent implements OnInit {
	@Output() productSelect = new EventEmitter<string>();
	@Input() filterGroupName: FilterGroupName;
	@Input() products: Array<Product>;
	columns = [
		{ name: 'Name', prop: 'name' },
		{ name: 'Category', prop: 'categoryName' },
		{ name: 'Supplier', prop: 'supplierName' },
		{ name: 'Event', prop: 'eventName' },
		{ name: 'Price', prop: 'priceAmount' },
		{ name: 'Rating', prop: 'rating' },
	];

	constructor(private store: Store<any>) {
	}

	ngOnInit() {
	}

	onSelect(event) {
		if (event.type === 'click' || event.type === 'keydown') {
			this.productSelect.emit(event.row.id);
		}
	}

	onSort(event) {
		const sortOrder = event.newValue.toUpperCase();
		const value = event.column.prop;
		const filter = new FilterSort(value, sortOrder);
		this.store.dispatch(FilterActions.removeFiltersForFilterClass(this.filterGroupName, FilterSort));
		this.store.dispatch(FilterActions.addFilter(filter, this.filterGroupName));
	}

}
