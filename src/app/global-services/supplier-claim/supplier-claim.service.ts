import { Injectable } from '@angular/core';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';
import { SupplierClaimQueries } from '~global-services/supplier-claim/supplier-claim.queries';
import { UserService } from '~global-services/user/user.service';
import { SupplierClaim } from '~models';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class SupplierClaimService extends GlobalWithAuditService<SupplierClaim> {

	constructor(protected apolloState: ApolloStateService, protected userSrv: UserService) {
		super(apolloState, SupplierClaimQueries, 'supplierClaim', 'supplierClaims', userSrv);
	}

}
