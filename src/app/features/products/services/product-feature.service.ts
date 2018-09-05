import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { Product, Project, TeamUser, ProductVoteRequest, User } from '~models';

import { ProductService, ProjectService, TeamUserService, UserService, SupplierService } from '~global-services';
import { SelectParams } from '~global-services/_global/select-params';
import { Sort } from '~shared/table/components/sort.interface';
import { ProductVoteRequestService } from '~global-services/product-vote-request/product-vote-request.service';
import { Apollo } from 'apollo-angular';
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
