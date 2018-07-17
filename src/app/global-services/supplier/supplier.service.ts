import { Injectable } from '@angular/core';
import { Supplier } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

import { GlobalService } from '../_global/global.service';
import { SupplierQueries } from './supplier.queries';

@Injectable({ providedIn: 'root' })
export class SupplierService extends GlobalService<Supplier> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new SupplierQueries(), 'Supplier');
	}

}
