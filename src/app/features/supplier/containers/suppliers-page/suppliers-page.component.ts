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
import { SupplierListActions } from '~app/features/supplier/store/supplier-list/supplier-list.bundle';
import { selectSupplierList, selectSupplierListPending, selectSupplierListIsFullyLoaded } from '~app/features/supplier/store';
import { Subject } from 'rxjs/Subject';
import { SortEvent } from '~app/shared/table/components/sort-event.interface';
import { AutoUnsub } from '~app/app-root/utils';

@Component({
	selector: 'supplier-page-app',
	templateUrl: './suppliers-page.component.html',
	styleUrls: ['./suppliers-page.component.scss'],
})
export class SuppliersPageComponent extends AutoUnsub implements OnInit {
	filterGroupName = FilterGroupName.SUPPLIERS_PAGE;
	pending$: Observable<boolean>;
	supplier$: Observable<Array<Supplier>>;
	repr = ERM.supplier;
	// maps current selection: { id: true }
	selection = new Map<string, boolean>();
	suppliers: Array<Supplier> = [];
	filters: Array<Filter> = [];
	sort$: Subject<Sort> = new Subject();
	currentSort: Sort = { sortBy: 'creationDate', sortOrder: 'DESC' };
	/** whether we loaded every suppliers */
	fullyLoaded: boolean;
	/** number of suppliers requested by paginated request */
	take = 30;

	constructor(private store: Store<any>, private router: Router) {
		super();
	}

	ngOnInit() {
		// select whether the suppliers are pending
		this.pending$ = this.store.select(selectSupplierListPending);
		this.store.select(selectSupplierListIsFullyLoaded)
			.pipe(takeUntil(this._destroy$))
			.subscribe(loaded => this.fullyLoaded = loaded);
		this.store.select(selectSupplierList)
			.pipe(takeUntil(this._destroy$))
			.subscribe(suppliers => this.suppliers = suppliers);
		this.store.dispatch(SupplierListActions.load({}));
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
		this.store.dispatch(SupplierListActions.load({
			filters: this.filters,
			pagination: { take: this.take, drop: 0 },
			sort: this.currentSort
		}));
	}

	/** loads more product when we reach the bottom of the page */
	loadMore() {
		if (!this.fullyLoaded) {
			this.store.dispatch(SupplierListActions.loadMore({
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
	onItemSelected(entityId: string) {
		this.selection.set(entityId, true);
	}

	/** When a supplier has been unselected */
	onItemUnselected(entityId: string) {
		this.selection.delete(entityId);
	}

	/** When all suppliers have been selected at once (from the table) */
	onAllSelected(selection: Map<string, boolean>) {
		this.selection = selection;
	}

	/** When all suppliers have been unselected at once (from the table) */
	onAllUnselected(selection: Map<string, boolean>) {
		this.selection = selection;
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

	/** reset the selection of suppliers */
	resetSelection() {
		this.selection = new Map();
	}

	/** Deletes the currently selected suppliers */
	deleteSelection() {
		const ids = Array.from(this.selection.keys());
		this.store.dispatch(fromSupplier.Actions.delete(ids));
		this.selection = new Map();
	}
}
