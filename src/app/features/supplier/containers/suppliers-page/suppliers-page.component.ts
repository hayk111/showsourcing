import { Component, OnInit } from '@angular/core';
import { FilterGroupName, selectFilterGroup, Filter } from '~shared/filters';
import { Store } from '@ngrx/store';
import { EntityState, Entity, ERM, Patch } from '~entity';
import { Supplier } from '~supplier';
import { Observable } from 'rxjs/Observable';
import { fromSupplier } from '~supplier';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { fromDialog } from '~dialog';
import { DialogName } from '~dialog';
import { SupplierListActions } from '~app/features/supplier/store/supplier-list/supplier-list.bundle';

@Component({
	selector: 'supplier-page-app',
	templateUrl: './suppliers-page.component.html',
	styleUrls: ['./suppliers-page.component.scss'],
})
export class SuppliersPageComponent implements OnInit {
	filterGroupName = FilterGroupName.SUPPLIERS_PAGE;
	pending$: Observable<boolean>;
	repr = ERM.supplier;
	// maps current selection {id: true}
	selection = new Map<string, boolean>();
	suppliers: Array<Supplier> = [];
	filters: Array<Filter> = [];

	constructor(private store: Store<any>, private router: Router) { }

	ngOnInit() {
		// select whether the suppliers are pending

		// this.pending$ = this.store.select(
		// 	fromSupplier.selectState
		// ).pipe(map(s => s.pending));

		this.store.dispatch(SupplierListActions.load({}));
		// select filters
		const filters$ = this.store.select<any>(selectFilterGroup(this.filterGroupName));
		// when filters change we need to redownload the suppliers with the new filters
		filters$.subscribe(filters => {
			// saving filters for when we need to paginate
			this.filters = filters;
			this.loadSuppliers(filters);
		});

	}


	/** loads initial suppliers and when the filters change */
	loadSuppliers(filters) {
		// this.store.dispatch(productActions.load({ filters }));
	}

	/** loads more product when we reach the bottom of the page */
	loadMore() {
		// this.store.dispatch(productActions.loadMore({ filters: this.filters, pagination: { drop: this.suppliers.length } }));
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
