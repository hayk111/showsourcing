import { Injectable } from '@angular/core';
import { SupplierStatus } from '~models';
import { ApolloClient } from '~shared/apollo';

import { GlobalService } from '../_global/global.service';
import { SupplierStatusQueries } from './supplier-status.queries';


@Injectable({
	providedIn: 'root'
})
export class SupplierStatusService extends GlobalService<SupplierStatus> {

	constructor(protected apollo: ApolloClient) {
		super(apollo, new SupplierStatusQueries(), 'SupplierStatus');
	}

}

