import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityState, Entity, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { Observable } from 'rxjs/Observable';
import { Supplier } from '../../../../store/model/entities/supplier.model';
import { FilterGroupName } from '../../../../store/model/misc/filter.model';
import { selectSuppliers } from '../../../../store/selectors/entities/suppliers.selector';

@Component({
	selector: 'app-supplier-page',
	templateUrl: './supplier-page.component.html',
	styleUrls: ['./supplier-page.component.scss'],
})
export class SupplierPageComponent implements OnInit {
	filterGroupName = FilterGroupName.SUPPLIER_PAGE;
	supplier$: Observable<EntityState<Supplier>>;
	pending = true;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.supplier$ = this.store.select(selectSuppliers);
		this.supplier$.subscribe(s => this.onItemsReceived(s));
	}

	onItemsReceived(items: EntityState<Supplier>) {
		this.pending = items.pending;
	}

}
