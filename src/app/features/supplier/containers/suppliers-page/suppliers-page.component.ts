import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SupplierFeatureService } from '~features/supplier/services/supplier-feature.service';
import { Supplier } from '~models';
import { DialogName, DialogService } from '~shared/dialog';
import { Filter, FilterService } from '~shared/filters';
import { Sort } from '~shared/table/components/sort.interface';
import { AutoUnsub } from '~utils';

import { SelectionService } from '../../services/selection.service';

@Component({
	selector: 'supplier-page-app',
	templateUrl: './suppliers-page.component.html',
	styleUrls: ['./suppliers-page.component.scss'],
	providers: [FilterService, SelectionService]
})
export class SuppliersPageComponent extends AutoUnsub implements OnInit {

	suppliers$: Observable<Supplier[]>;
	filters: Array<Filter> = [];
	/** current sort used for sorting suppliers */
	sort$: Subject<Sort> = new Subject();
	/** current filters applied to suppliers */
	filters$: Observable<Filter[]>;
	pagination$: Observable<any>;
	currentSort: Sort = { sortBy: 'creationDate', sortOrder: 'ASC' };
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

	constructor(
		private router: Router,
		private supplierSrv: SupplierFeatureService,
		private selectionSrv: SelectionService,
		private dlgSrv: DialogService) {
		super();
	}

	ngOnInit() {
		this.pending = true;
		// this.suppliers$ = this.supplierSrv.select().pipe(
		// 	tap(() => {
		// 		if (this.initialLoading) {
		// 			this.pending = false;
		// 			this.initialLoading = false;
		// 		}
		// 	})
		// );
		this.selected$ = this.selectionSrv.selection$;
	}

	/** loads more product when we reach the bottom of the page */
	loadMore() {
		// this.page++;
		// this.pending = true;
		// this.supplierSrv.loadSuppliersNextPage({ page: this.page, sort: this.currentSort }).then(() => {
		// 	this.pending = false;
		// });
	}

	onSort(sort: Sort) {
		// this.currentSort = sort;
		// this.pending = true;
		// this.supplierSrv.sortSuppliers({ sort }).then(() => {
		// 	this.pending = false;
		// });
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
	selectAll(ids: string[]) {
		this.selectionSrv.selectAll(ids);
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
		this.supplierSrv.deleteSuppliers(Array.from(this.selectionSrv.selection.keys()));
		this.resetSelection();
	}
}
