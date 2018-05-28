import { Injectable } from '@angular/core';
import { ApolloClient } from '~shared/apollo';
import { StatusModule } from '~shared/status/status.module';
import { StatusSelectorQueries } from './status-selector.queries';
import { map, tap } from 'rxjs/operators';
import { SupplierStatus, ProductStatus } from '~models';
import { Observable } from 'rxjs';




@Injectable({
	providedIn: 'root'
})
export class StatusSelectorService {

	constructor(private apollo: ApolloClient) { }

	getSupplierStatuses(): Observable<SupplierStatus[]> {
		return this.apollo.subscribe({ query: StatusSelectorQueries.supplierStatus }).pipe(
			map(r => r.data.supplierStatuses)
		);
	}

	getProductStatuses(): Observable<ProductStatus[]> {
		return this.apollo.subscribe({ query: StatusSelectorQueries.productStatus }).pipe(
			map(r => r.data.productStatuses)
		);
	}
}
