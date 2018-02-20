import { Component, OnInit } from '@angular/core';
import { FilterGroupName } from '../../../../store/model/misc/filter.model';
import { Store } from '@ngrx/store';
import { EntityState, Entity, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { Supplier } from '../../../../store/model/entities/supplier.model';
import { Observable } from 'rxjs/Observable';
import { selectSuppliers } from '../../../../store/selectors/entities/suppliers.selector';
import { selectFilteredEntity } from '../../../../store/selectors/misc/filter.selectors';
import { map } from 'rxjs/operators';
import { TargetAction } from '../../../../store/action/target/target.action';
import { Router } from '@angular/router';
import { DialogActions } from '../../../../store/action/ui/dialog.action';
import { DialogName } from '../../../../store/model/ui/dialog.model';

@Component({
	selector: 'app-supplier-page',
	templateUrl: './suppliers-page.component.html',
	styleUrls: ['./suppliers-page.component.scss'],
})
export class SuppliersPageComponent implements OnInit {
	filterGroupName = FilterGroupName.SUPPLIER_PAGE;
	suppliers$: Observable<Array<Supplier>>;
	pending$: Observable<boolean>;
	repr = entityRepresentationMap.suppliers;
	// maps current selection
	selections = {};

	constructor(private store: Store<any>, private router: Router) { }

	ngOnInit() {
		this.suppliers$ = this.store.select(selectFilteredEntity(this.filterGroupName, this.repr));
		this.pending$ = this.store.select(selectSuppliers).pipe(map(s => s.pending));
	}

	openNewDialog() {
		this.store.dispatch(DialogActions.open(DialogName.NEW_SUPPLIER));
	}

	onItemSelected(entityId: string) {
		//const target = { entityId, entityRepr: this.repr };
		// this.store.dispatch(TargetAction.select(target));
		// this.router.navigate(['/suppliers', 'supplier-details', entityId]);
		this.selections[entityId] = true;
	}

	onItemUnselected(entityId: string) {
		this.selections[entityId] = false;
	}
}
