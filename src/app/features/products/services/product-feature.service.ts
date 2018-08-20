import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { Product, Project, TeamUser, ProductVoteRequest, User } from '~models';

import { ProductService, ProjectService, TeamUserService, UserService, SupplierService } from '~global-services';
import { SelectParams } from '~global-services/_global/select-params';
import { Sort } from '~shared/table/components/sort.interface';
import { ApolloWrapper } from '~shared/apollo';
import { ProductVoteRequestService } from '~global-services/product-vote-request/product-vote-request.service';
import { Apollo } from 'apollo-angular';

@Injectable()
export class ProductFeatureService extends ProductService {

	constructor(
		protected wrapper: ApolloWrapper,
		private projectSrv: ProjectService,
		private productVoteReqSrv: ProductVoteRequestService,
		private teamUserSrv: TeamUserService,
		private supplierSrv: SupplierService,
		protected userSrv: UserService
	) {
		super(wrapper, userSrv);
	}


	getContacts(supplierId: string) {
		return this.supplierSrv.selectOne(supplierId);
	}

}
