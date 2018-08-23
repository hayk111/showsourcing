import { Injectable } from '@angular/core';
import { SupplierStatus } from '~models';
import { Apollo } from 'apollo-angular';

import { GlobalService } from '~global-services/_global/global.service';
import { SupplierStatusQueries } from '~global-services/supplier-status/supplier-status.queries';


@Injectable({
	providedIn: 'root'
})
export class SupplierStatusService extends GlobalService<SupplierStatus> {

	constructor(wrapper: ApolloWrapper) {
		super(apollo, new SupplierStatusQueries(), 'SupplierStatus');
	}

}

