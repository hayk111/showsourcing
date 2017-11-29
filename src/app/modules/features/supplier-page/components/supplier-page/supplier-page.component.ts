import { Component, OnInit } from '@angular/core';
import { FilterGroupName, EntityRepresentation, entityRepresentationMap } from '../../../../store/model/filter.model';
import { Store } from '@ngrx/store';
import { EntityState, Entity } from '../../../../store/utils/entities.utils';
import { Supplier } from '../../../../store/model/supplier.model';
import { Observable } from 'rxjs/Observable';
import { selectSuppliers } from '../../../../store/selectors/suppliers.selector';

@Component({
	selector: 'app-supplier-page',
	templateUrl: './supplier-page.component.html',
	styleUrls: ['./supplier-page.component.scss'],
})
export class SupplierPageComponent implements OnInit {
	filterGroupName = FilterGroupName.SUPPLIER_PAGE;
	targets = [ entityRepresentationMap.name ];
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
