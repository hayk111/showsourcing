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
	@Output() productUnselect = new EventEmitter<string>();
	@Output() productOpen = new EventEmitter<string>();
	@Input() filterGroupName: FilterGroupName;
	@Input() products: Array<Product>;
	@Input() selections: Map<string, boolean>;

	constructor(private store: Store<any>) {
	}

	ngOnInit() {
	}

	onActivate(event) {
		if (event.type === 'click' || event.type === 'keydown') {
			this.productOpen.emit(event.row.id);
		}
	}

	onSort(event) {
		const sortOrder = event.newValue.toUpperCase();
		const value = event.column.prop;
		const filter = new FilterSort(value, sortOrder);
		this.store.dispatch(FilterActions.removeFiltersForFilterClass(this.filterGroupName, FilterSort));
		this.store.dispatch(FilterActions.addFilter(filter, this.filterGroupName));
	}

	onCheck(event, productId) {
		event.preventDefault();
		event.stopPropagation();
		if (event.target.checked)
			this.productSelect.emit(productId);
		else
			this.productUnselect.emit(productId);
	}

	// we need to stop the propagation on the checkbox click so we don't open the product
	onCheckboxClick(event) {
		event.stopPropagation();
	}


}
