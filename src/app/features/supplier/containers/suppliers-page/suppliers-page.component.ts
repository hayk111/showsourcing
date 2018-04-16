import { Component, OnInit } from '@angular/core';
import { FilterGroupName } from '~shared/filters';
import { Store } from '@ngrx/store';
import { EntityState, Entity, ERM, Patch } from '~entity';
import { Supplier } from '~supplier';
import { Observable } from 'rxjs/Observable';
import { fromSupplier } from '~supplier';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { fromDialog } from '~dialog';
import { DialogName } from '~dialog';

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

	constructor(private store: Store<any>, private router: Router) { }

	ngOnInit() {
		this.pending$ = this.store.select(fromSupplier.selectState).pipe(map(s => s.pending));
	}

	openNewDialog() {
		this.store.dispatch(fromDialog.Actions.open(DialogName.NEW_SUPPLIER));
	}

	onItemSelected(entityId: string) {
		this.selection.set(entityId, true);
	}

	onItemUnselected(entityId: string) {
		this.selection.delete(entityId);
	}

	onAllSelected(selection: Map<string, boolean>) {
		this.selection = selection;
	}

	onAllUnselected(selection: Map<string, boolean>) {
		this.selection = selection;
	}

	onItemOpened(entityId: string) {
		this.router.navigate(['/supplier', 'details', entityId]);
	}

	onItemFavorited(entityId: string) {
		const patch: Patch = { id: entityId, propName: 'rating', value: 5 };
		this.store.dispatch(fromSupplier.Actions.patch(patch));
	}

	onItemUnfavorited(entityId: string) {
		const patch: Patch = { id: entityId, propName: 'rating', value: 1 };
		this.store.dispatch(fromSupplier.Actions.patch(patch));
	}

	resetSelection() {
		this.selection = new Map();
	}

	deleteSelection() {
		const ids = Array.from(this.selection.keys());
		this.store.dispatch(fromSupplier.Actions.delete(ids));
		this.selection = new Map();
	}
}
