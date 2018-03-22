import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Supplier } from '~suppliers/models';
import { Store } from '@ngrx/store';
import { FilterActions, FilterGroupName, FilterSort } from '~app/shared/filters';

@Component({
	selector: 'supplier-list-view-app',
	templateUrl: './supplier-list-view.component.html',
	styleUrls: ['./supplier-list-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierListViewComponent implements OnInit {
	@Input() suppliers: Array<Supplier> = [];
	@Input() productsCount: { [key: string]: number }; // { id: numberProducts }
	@Input() selection: Map<string, boolean>;
	@Output() supplierSelect = new EventEmitter<string>();
	@Output() supplierUnselect = new EventEmitter<string>();
	@Output() supplierOpen = new EventEmitter<string>();
	@Output() supplierFavorited = new EventEmitter<string>();
	@Output() supplierUnfavorited = new EventEmitter<string>();
	filterGroupName = FilterGroupName.SUPPLIER_PAGE;

	constructor(private store: Store<any>) {}

	ngOnInit() {}

	onCheck(value, supplierId) {
		if (value) this.supplierSelect.emit(supplierId);
		else this.supplierUnselect.emit(supplierId);
	}

	onSort({ order, sortWith }) {
		// we first need to remove the current sorting filter
		this.store.dispatch(FilterActions.removeFiltersForFilterClass(this.filterGroupName, FilterSort));
		// then we add a new one
		const filter = new FilterSort(sortWith, order.toUpperCase());
		this.store.dispatch(FilterActions.addFilter(filter, this.filterGroupName));
	}
}
