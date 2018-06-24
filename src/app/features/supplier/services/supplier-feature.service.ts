import { Injectable } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SupplierFeatureQueries } from '~features/supplier/services/supplier-feature.queries';
import { Product, Supplier, Task } from '~models';
import { ApolloClient } from '~shared/apollo';
import { PER_PAGE } from '~utils/constants';
import { SupplierService } from '../../../global-services/supplier/supplier.service';
import { ProductService } from '../../../global-services';


@Injectable()
export class SupplierFeatureService {

	constructor(
		private apollo: ApolloClient,
		private supplierSrv: SupplierService,
		private productSrv: ProductService
	) { }



	selectOne(id: string): Observable<Supplier> {
		return this.supplierSrv.selectOne(id);
	}

	createSupplier(supplier: Supplier) {
		return this.supplierSrv.create(supplier);
	}

	updateSupplier(supplier: Supplier) {
		return this.supplierSrv.update(supplier);
	}

	deleteSuppliers(any: any) {
		throw Error('not implemented yet');
	}

	/** gets the latest products, w */
	getLatestProducts(supplierId: string): Observable<Product[]> {
		return this.productSrv.selectMany()
		return this.apollo.subscribe({
			query: SupplierFeatureQueries.latestProducts,
			variables: { query: `supplier.id == '${supplierId}'` }
		}).pipe(
			map((r: any) => r.data.products)
		);
	}



}

