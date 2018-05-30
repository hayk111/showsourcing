import { Component, OnInit } from '@angular/core';
import { FilterService, Filter } from '~shared/filters';
import { Supplier } from '~models';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, tap, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DialogName, DialogService } from '~shared/dialog';
import { SortEvent } from '~shared/table/components/sort-event.interface';
import { AutoUnsub } from '~utils';
import { SelectionService } from '../../services/selection.service';
import { SupplierService } from '~features/supplier/services/supplier.service';

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
	/** when the suppliers are loaded for the first time */
	initialLoading = true;
	/** number of suppliers requested by paginated request */
	page = 0;
	perPage = 30;

	constructor(
		private router: Router,
		private supplierSrv: SupplierService,
		private selectionSrv: SelectionService,
		private dlgSrv: DialogService,
		private filterSrv: FilterService) {
		super();
	}

	ngOnInit() {
		this.pending = true;
		this.suppliers$ = this.supplierSrv.selectSuppliers({ perPage: this.perPage }).pipe(
			tap(() => {
				if (this.initialLoading) {
					this.pending = false;
					this.initialLoading = false;
				}
			})
		);
		this.selected$ = this.selectionSrv.selection$;
		// this.filters$ = this.store.select(selectFilterGroup(this.filterGroupName));
	}

	/** loads more product when we reach the bottom of the page */
	loadMore() {
		this.page++;
		this.pending = true;
		this.supplierSrv.loadSuppliersNextPage({ page: this.page, perPage: this.perPage }).then(() => {
			this.pending = false;
		});
	}

	onSort(sort: SortEvent) {
		this.currentSort = sort;
		this.pending = true;
		this.supplierSrv.sortSuppliers({ sort, perPage: this.perPage }).then(() => {
			this.pending = false;
		});
	}

	/** Opens the dialog for creating a new supplier */
	openNewDialog() {
		this.dlgSrv.open(DialogName.NEW_SUPPLIER);
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
