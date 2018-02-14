import { Component, OnInit } from '@angular/core';
import { FilterGroupName } from '../../../../store/model/misc/filter.model';
import { Store } from '@ngrx/store';
import { EntityState, Entity, entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { Supplier } from '../../../../store/model/entities/supplier.model';
import { Observable } from 'rxjs/Observable';
import { selectSuppliers } from '../../../../store/selectors/entities/suppliers.selector';
import { selectFilteredEntity } from '../../../../store/selectors/misc/filter.selectors';
import { map } from 'rxjs/operators';

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

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.suppliers$ = this.store.select(selectFilteredEntity(this.filterGroupName, this.repr));
		this.pending$ = this.store.select(selectSuppliers).pipe(map(s => s.pending));
	}

}
