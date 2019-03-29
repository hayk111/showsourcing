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

	/** @inheritDoc
	 * Updates on entity with an audit will add properties needed by the backend
	 */
	update(entity: any, client?: Client, fields?: string, isOptimistic: boolean = true) {
		entity.lastUpdatedDate = '' + new Date();
		return super.update(entity, client, fields, isOptimistic);
	}

}
