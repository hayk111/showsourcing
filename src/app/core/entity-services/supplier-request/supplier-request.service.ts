import { Injectable } from '@angular/core';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { SupplierRequest } from '~core/models';
import { GlobalService } from '~entity-services/_global/global.service';

import { SupplierRequestQueries } from './supplier-request.queries';

@Injectable({ providedIn: 'root' })
export class SupplierRequestService extends GlobalService<SupplierRequest> {

	defaultClient = Client.GLOBAL_REQUEST;

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, SupplierRequestQueries, 'request', 'requests');
	}

}
