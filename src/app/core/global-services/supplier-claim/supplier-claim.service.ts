import { Injectable } from '@angular/core';
import { GlobalService } from '~global-services/_global/global.service';
import { SupplierClaimQueries } from '~global-services/supplier-claim/supplier-claim.queries';
import { SupplierClaim } from '~models';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { Client } from '~core/apollo/services/apollo-client-names.const';


@Injectable({
	providedIn: 'root'
})
export class SupplierClaimService extends GlobalService<SupplierClaim> {
	defaultClient = Client.SUPPLIER_ONBOARDING;

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, SupplierClaimQueries, 'supplierClaim', 'supplierClaims');
	}

}
