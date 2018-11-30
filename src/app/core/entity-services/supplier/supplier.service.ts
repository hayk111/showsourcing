import { Injectable } from '@angular/core';
import { GlobalWithAuditService } from '~entity-services/_global/global-with-audit.service';
import { SupplierQueries } from '~entity-services/supplier/supplier.queries';
import { UserService } from '~entity-services/user/user.service';
import { Supplier } from '~models';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';

@Injectable({ providedIn: 'root' })
export class SupplierService extends GlobalWithAuditService<Supplier> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, SupplierQueries, 'supplier', 'suppliers', userSrv);
	}

}
