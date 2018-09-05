import { Injectable } from '@angular/core';
import { SupplierStatus } from '~models';
import { Apollo } from 'apollo-angular';

import { GlobalService } from '~global-services/_global/global.service';
import { SupplierStatusQueries } from '~global-services/supplier-status/supplier-status.queries';
import { ApolloStateService } from '~shared/apollo';


@Injectable({
	providedIn: 'root'
})
export class SupplierStatusService extends GlobalService<SupplierStatus> {

	constructor(protected apollo: Apollo, protected apolloState: ApolloStateService) {
		super(apollo, apolloState, SupplierStatusQueries, 'supplierStatus', 'supplierStatuses');
	}

}

