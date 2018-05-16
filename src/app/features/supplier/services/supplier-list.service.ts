import { Injectable } from "@angular/core";
import { Apollo } from 'apollo-angular';
import { Observable } from "rxjs";
import { SupplierListQueries } from "~app/features/supplier/services/supplier-list.queries";
import { Supplier } from '~models';
import { map } from 'rxjs/operators';

@Injectable()
export class SupplierListService {
	constructor(private apollo: Apollo) { }

	getList(options?: any): Observable<Supplier[]> {
		// add pagination
		// add sorting
		// add filtering
		return this.apollo.subscribe({ query: SupplierListQueries.list }).pipe(
			map((r: any) => (r.data as any).suppliers),
		);
	}

	updateSupplier(supplier: Supplier) {
		return this.apollo.mutate({ mutation: SupplierListQueries.updateSupplier });
	}

	removeSuppliers(ids: string[]) {
		throw Error('now implemented yet');
	}
}