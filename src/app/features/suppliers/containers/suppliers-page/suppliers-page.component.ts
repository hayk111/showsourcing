import { Component, OnInit } from '@angular/core';
import { FilterGroupName } from '~shared/filters';
import { Store } from '@ngrx/store';
import { EntityState, Entity, entityRepresentationMap } from '~store/utils/entities.utils';
import { Supplier } from '~suppliers/models';
import { Observable } from 'rxjs/Observable';
import { selectSuppliers } from '~suppliers/store/selectors';
import { selectFilteredEntity } from '~shared/filters';
import { map } from 'rxjs/operators';
import { TargetAction } from '~store/action/target/target.action';
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
	repr = entityRepresentationMap.suppliers;
	// maps current selection
	selection = new Map<string, boolean>();

	constructor(private store: Store<any>, private router: Router) { }

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
}
