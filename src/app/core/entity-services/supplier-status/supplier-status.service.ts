import { Injectable } from '@angular/core';
import { SupplierStatus } from '~models';
import { Apollo } from 'apollo-angular';

import { GlobalService } from '~entity-services/_global/global.service';
import { SupplierStatusQueries } from '~entity-services/supplier-status/supplier-status.queries';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class SupplierStatusService extends GlobalService<SupplierStatus> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, SupplierStatusQueries, 'supplierStatus', 'supplierStatuses');
	}

}

