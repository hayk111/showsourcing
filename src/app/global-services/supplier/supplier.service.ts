import { Injectable } from '@angular/core';
import { Supplier } from '~models';
import { ApolloClient } from '~shared/apollo';

import { GlobalService } from '../_global/global.service';
import { SupplierQueries } from './supplier.queries';

@Injectable()
export class SupplierService extends GlobalService<Supplier> {

	constructor(protected apollo: ApolloClient) {
		super(apollo, new SupplierQueries(), 'Supplier');
	}

}
