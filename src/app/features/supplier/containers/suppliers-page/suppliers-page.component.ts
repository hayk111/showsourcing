import { Component, OnInit } from '@angular/core';
import { Filter, FilterService } from '~shared/filters';
import { Store } from '@ngrx/store';
import { Supplier } from '~models';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, tap, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DialogName, DialogService } from '~shared/dialog';
import { SortEvent } from '~app/shared/table/components/sort-event.interface';
import { AutoUnsub } from '~app/app-root/utils';
import { SelectionService } from '../../services/selection.service';
import { SupplierService } from '~app/features/supplier/services/supplier.service';

@Component({
	selector: 'supplier-page-app',
	templateUrl: './suppliers-page.component.html',
	styleUrls: ['./suppliers-page.component.scss'],
	providers: [FilterService]
})
export class SuppliersPageComponent extends AutoUnsub implements OnInit {
	suppliers: Array<Supplier> = [];
	suppliers$: Observable<Supplier[]>;
	filters: Array<Filter> = [];
	/** current sort used for sorting suppliers */
	sort$: Subject<SortEvent> = new Subject();
	/** current filters applied to suppliers */
	filters$: Observable<Filter[]>;
	pagination$: Observable<any>;
	currentSort: SortEvent = { sortBy: 'creationDate', sortOrder: 'ASC' };
	/** selected suppliers */
	selected$: Observable<Map<string, boolean>>;
	/** whether some suppliers are currently being loaded */
	pending: boolean;
	/** whether we loaded every suppliers */
	fullyLoaded: boolean;
	/** number of suppliers requested by paginated request */
	take = 30;

	constructor(
		private router: Router,
		private supplierSrv: SupplierService,
		private selectionSrv: SelectionService,
		private dlgSrv: DialogService,
		private filterSrv: FilterService) {
		super();
	}

	ngOnInit() {
		this.suppliers$ = this.supplierSrv.getList();
		this.selected$ = this.selectionSrv.selection$;
		// this.filters$ = this.store.select(selectFilterGroup(this.filterGroupName));
	}

	loadSuppliersV2() {
		// combineLatest(this.sort$, this.filters$, this.pagination$, (sort, filters, pagination) => {

		// }).pipe();
		// this.suppliers$ = this.supplierSrv.getList();
	}

	/** loads initial suppliers and when the filters change */
	loadSuppliers() {
		// 	this.store.dispatch(fromSupplierList.SupplierListActions.load({
		// 		filters: this.filters,
		// 		pagination: { take: this.take, drop: 0 },
		// 		sort: this.currentSort
		// 	}));
	}

	/** loads more product when we reach the bottom of the page */
	loadMore() {
		// if (!this.fullyLoaded) {
		// 	this.store.dispatch(fromSupplierList.SupplierListActions.loadMore({
		// 		filters: this.filters,
		// 		pagination: { take: this.take, drop: this.suppliers.length },
		// 		sort: this.currentSort
		// 	}));
		// }
	}

	onSort(sort: SortEvent) {
		this.currentSort = sort;
		this.loadSuppliers();
	}

	/** Opens the dialog for creating a new supplier */
	openNewDialog() {
		this.dlgSrv.open(DialogName.NEW_SUPPLIER)
	}

	/** When a supplier has been selected */
	selectItem(entityId: string) {
		this.selectionSrv.selectOne(entityId);
	}

	/** When a supplier has been unselected */
	unselectItem(entityId: string) {
		this.selectionSrv.unselectOne(entityId);
	}

	/** When all suppliers have been selected at once (from the table) */
	selectAll() {
		this.selectionSrv.selectAll(this.suppliers.map(s => s.id));
	}

	/** reset the selection of suppliers */
	resetSelection() {
		this.selectionSrv.unselectAll();
	}

	/** Navigates to a supplier details page */
	onItemOpened(entityId: string) {
		this.router.navigate(['/supplier', 'details', entityId]);
	}

	/** Makes a supplier a favorite */
	onItemFavorited(id: string) {
		this.supplierSrv.updateSupplier({ id, favorite: true });
	}

	/** Makes a supplier no more a favorite */
	onItemUnfavorited(id: string) {
		this.supplierSrv.updateSupplier({ id, favorite: false });
	}

	/** Deletes the currently selected suppliers */
	deleteSelection() {
		this.supplierSrv.removeSuppliers(Array.from(this.selectionSrv.selection.keys()));
		this.resetSelection();
	}
}
