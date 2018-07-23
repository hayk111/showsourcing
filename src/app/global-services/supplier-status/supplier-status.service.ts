import { Injectable } from '@angular/core';
import { SupplierStatus } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

import { GlobalService } from '~global-services/_global/global.service';
import { SupplierStatusQueries } from '~global-services/supplier-status/supplier-status.queries';


@Injectable({
	providedIn: 'root'
})
export class SupplierStatusService extends GlobalService<SupplierStatus> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new SupplierStatusQueries(), 'SupplierStatus');
	}

}

