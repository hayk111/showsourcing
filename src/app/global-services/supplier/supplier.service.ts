import { Injectable } from '@angular/core';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { SupplierQueries } from '~global-services/supplier/supplier.queries';
import { UserService } from '~global-services/user/user.service';
import { Supplier } from '~models';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';

@Injectable({ providedIn: 'root' })
export class SupplierService extends GlobalWithAuditService<Supplier> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, SupplierQueries, 'supplier', 'suppliers', userSrv);
	}

}
