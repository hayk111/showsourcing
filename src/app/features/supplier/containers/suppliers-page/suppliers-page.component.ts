import { Component, OnInit } from '@angular/core';
import { FilterGroupName, selectFilterGroup, Filter } from '~shared/filters';
import { Store } from '@ngrx/store';
import { EntityState, Entity, ERM, Patch, Sort } from '~entity';
import { Supplier } from '~supplier';
import { Observable } from 'rxjs/Observable';
import { fromSupplier } from '~supplier';
import { map, tap, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { fromDialog } from '~dialog';
import { DialogName } from '~dialog';
import * as fromSupplierList from '~app/features/supplier/store/supplier-list/supplier-list.bundle';
import { selectSupplierList, selectSupplierListState } from '~app/features/supplier/store';
import { Subject } from 'rxjs/Subject';
import { SortEvent } from '~app/shared/table/components/sort-event.interface';
import { AutoUnsub } from '~app/app-root/utils';

@Component({
	selector: 'supplier-page-app',
	templateUrl: './suppliers-page.component.html',
	styleUrls: ['./suppliers-page.component.scss'],
})
export class SuppliersPageComponent extends AutoUnsub implements OnInit {
	/** filter group name so we can attach filters to this page and filter the suppliers */
	filterGroupName = FilterGroupName.SUPPLIERS_PAGE;
	suppliers: Array<Supplier> = [];
	filters: Array<Filter> = [];
	repr = ERM.supplier;
	/** current sort used for sorting suppliers */
	sort$: Subject<Sort> = new Subject();
	currentSort: Sort = { sortBy: 'creationDate', sortOrder: 'DESC' };
	/** selected suppliers */
	selected: Array<string>;
	/** whether some suppliers are currently being loaded */
	pending: boolean;
	/** whether we loaded every suppliers */
	fullyLoaded: boolean;
	/** number of suppliers requested by paginated request */
	take = 30;

	constructor(private store: Store<any>, private router: Router) {
		super();
	}

	ngOnInit() {
		// select whether the suppliers are pending
		this.store.select(selectSupplierListState)
			.pipe(takeUntil(this._destroy$))
			.subscribe((state: fromSupplierList.State) => {
				// we are receiving an id of array from the store while we need a map
				this.selected = state.selected;
				this.pending = state.pending;
				this.fullyLoaded = state.fullyLoaded;
			});
		this.store.select(selectSupplierList)
			.pipe(takeUntil(this._destroy$))
			.subscribe(suppliers => this.suppliers = suppliers);
		this.store.dispatch(fromSupplierList.SupplierListActions.load({}));
		// select filters
		const filters$ = this.store.select<any>(selectFilterGroup(this.filterGroupName));
		// when filters change we need to redownload the suppliers with the new filters
		filters$
			.pipe(takeUntil(this._destroy$))
			.subscribe(filters => {
				// saving filters for when we need to paginate
				this.filters = filters;
				this.loadSuppliers();
			});
	}

	/** loads initial suppliers and when the filters change */
	loadSuppliers() {
		this.store.dispatch(fromSupplierList.SupplierListActions.load({
			filters: this.filters,
			pagination: { take: this.take, drop: 0 },
			sort: this.currentSort
		}));
	}

	/** loads more product when we reach the bottom of the page */
	loadMore() {
		if (!this.fullyLoaded) {
			this.store.dispatch(fromSupplierList.SupplierListActions.loadMore({
				filters: this.filters,
				pagination: { take: this.take, drop: this.suppliers.length },
				sort: this.currentSort
			}));
		}
	}

	onSort(sort: SortEvent) {
		this.currentSort = sort;
		this.loadSuppliers();
	}

	/** Opens the dialog for creating a new supplier */
	openNewDialog() {
		this.store.dispatch(fromDialog.Actions.open(DialogName.NEW_SUPPLIER));
	}

	/** When a supplier has been selected */
	selectItem(entityId: string) {
		this.store.dispatch(fromSupplierList.SupplierListActions.selectOne(entityId));
	}

	/** When a supplier has been unselected */
	unselectItem(entityId: string) {
		this.store.dispatch(fromSupplierList.SupplierListActions.unselectOne(entityId));
	}

	/** When all suppliers have been selected at once (from the table) */
	selectAll() {
		this.store.dispatch(fromSupplierList.SupplierListActions.selectAll());
	}

	/** reset the selection of suppliers */
	resetSelection() {
		this.store.dispatch(fromSupplierList.SupplierListActions.unselectAll());
	}

	/** Navigates to a supplier details page */
	onItemOpened(entityId: string) {
		this.router.navigate(['/supplier', 'details', entityId]);
	}

	/** Makes a supplier a favorite */
	onItemFavorited(entityId: string) {
		const patch: Patch = { id: entityId, propName: 'rating', value: 5 };
		this.store.dispatch(fromSupplier.Actions.patch(patch));
	}

	/** Makes a supplier no more a favorite */
	onItemUnfavorited(entityId: string) {
		const patch: Patch = { id: entityId, propName: 'rating', value: 1 };
		this.store.dispatch(fromSupplier.Actions.patch(patch));
	}

	/** Deletes the currently selected suppliers */
	deleteSelection() {
		this.store.dispatch(fromSupplierList.SupplierListActions.delete(this.selected));
		this.resetSelection();
	}
}
