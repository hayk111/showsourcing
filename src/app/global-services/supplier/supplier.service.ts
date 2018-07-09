import { Injectable } from '@angular/core';
import { Supplier } from '~models';
import { GqlClient } from '~shared/apollo';

import { GlobalService } from '../_global/global.service';
import { SupplierQueries } from './supplier.queries';

@Injectable({ providedIn: 'root' })
export class SupplierService extends GlobalService<Supplier> {

	constructor(protected gqlClient: GqlClient) {
		super(gqlClient, new SupplierQueries(), 'Supplier');
	}

}
