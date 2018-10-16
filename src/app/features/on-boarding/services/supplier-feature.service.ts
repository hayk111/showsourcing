import { Injectable } from '@angular/core';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { SupplierQueries } from '~global-services/supplier/supplier.queries';
import { UserService } from '~global-services/user/user.service';
import { Supplier } from '~models';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';
import { Client } from '~shared/apollo/services/apollo-client-names.const';

@Injectable({ providedIn: 'root' })
export class SupplierFeatureService extends GlobalWithAuditService<Supplier> {

	defaultClient = Client.GLOBAL_DATA;

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, SupplierQueries, 'supplier', 'suppliers', userSrv);
	}

}
