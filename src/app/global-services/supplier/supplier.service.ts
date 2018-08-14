import { Injectable } from '@angular/core';
import { Supplier } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';

import { GlobalService } from '~global-services/_global/global.service';
import { SupplierQueries } from '~global-services/supplier/supplier.queries';
import { UserService } from '~global-services/user/user.service';

@Injectable({ providedIn: 'root' })
export class SupplierService extends GlobalService<Supplier> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new SupplierQueries(), 'Supplier');
	}

}
