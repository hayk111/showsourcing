import { Injectable } from '@angular/core';
import { ProductService, SupplierService, UserService } from '~global-services';
import { SupplierQueries } from '~global-services/supplier/supplier.queries';
import { ApolloStateService } from '~shared/apollo';

@Injectable()
export class ProductFeatureService extends ProductService {

	constructor(
		protected apolloState: ApolloStateService,
		private supplierSrv: SupplierService,
		protected userSrv: UserService
	) {
		super(apolloState, userSrv);
	}

	getContacts(supplierId: string) {
		return this.supplierSrv.queryOne(supplierId, SupplierQueries.contacts);
	}


}
