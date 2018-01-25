import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { EntityState, entityStateToArray, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { FilterGroupName, FilterSort } from '../../../../store/model/misc/filter.model';
import { Supplier } from '../../../../store/model/entities/supplier.model';
import { selectEntityArray } from '../../../../store/selectors/misc/utils.selector';
import { FilterActions } from '../../../../store/action/misc/filter.action';

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
		this.products$ = this.store.select(selectEntityArray(entityRepresentationMap.product));
	}

	ngOnInit() {
	}

	onSelect(event) {
		if (event.type === 'click' || event.type === 'keydown') {
			this.itemSelected.emit(event.row.id);
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
