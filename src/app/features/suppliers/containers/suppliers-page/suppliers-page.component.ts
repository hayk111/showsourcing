import { Component, OnInit } from '@angular/core';
import { FilterGroupName } from '~shared/filters';
import { Store } from '@ngrx/store';
import { EntityState, Entity, ERM, Patch } from '~entity';
import { Supplier } from '~suppliers/models';
import { Observable } from 'rxjs/Observable';
import { selectSuppliers, SupplierActions } from '~suppliers/store';
import { selectFilteredEntity } from '~shared/filters';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DialogActions } from '~dialog';
import { DialogName } from '~dialog';

@Component({
	selector: 'supplier-page-app',
	templateUrl: './suppliers-page.component.html',
	styleUrls: ['./suppliers-page.component.scss'],
})
export class SuppliersPageComponent implements OnInit {
	filterGroupName = FilterGroupName.SUPPLIER_PAGE;
	suppliers$: Observable<Array<Supplier>>;
	pending$: Observable<boolean>;
	repr = ERM.suppliers;
	// maps current selection {id: true}
	selection = new Map<string, boolean>();

	constructor(private store: Store<any>, private router: Router) {}

	ngOnInit() {
		this.suppliers$ = this.store.select(selectFilteredEntity(this.filterGroupName, this.repr));
		this.pending$ = this.store.select(selectSuppliers).pipe(map(s => s.pending));
	}

	openNewDialog() {
		this.store.dispatch(DialogActions.open(DialogName.NEW_SUPPLIER));
	}

	onItemSelected(entityId: string) {
		this.selection.set(entityId, true);
	}

	onItemUnselected(entityId: string) {
		this.selection.delete(entityId);
	}

	onItemOpened(entityId: string) {
		this.router.navigate(['/suppliers', 'details', entityId]);
	}

	onItemFavorited(entityId: string) {
		const patch: Patch = { id: entityId, propName: 'rating', value: 5 };
		this.store.dispatch(SupplierActions.patch(patch));
	}

	onItemUnfavorited(entityId: string) {
		const patch: Patch = { id: entityId, propName: 'rating', value: 1 };
		this.store.dispatch(SupplierActions.patch(patch));
	}

	resetSelection() {
		this.selection = new Map();
	}

	deleteSelection() {
		const ids = Array.from(this.selection.keys());
		this.store.dispatch(SupplierActions.delete(ids));
		this.selection = new Map();
	}
}
