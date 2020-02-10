import { Injectable } from '@angular/core';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';
import { SupplierStatusQueries } from '~core/erm/services/supplier-status/supplier-status.queries';
import { SupplierStatus } from '~core/erm/models';

import { GlobalService } from '../_global/global.service';


@Injectable({
	providedIn: 'root'
})
export class SupplierStatusService extends GlobalService<SupplierStatus> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, SupplierStatusQueries, 'supplierStatus', 'supplierStatuses');
	}

}
