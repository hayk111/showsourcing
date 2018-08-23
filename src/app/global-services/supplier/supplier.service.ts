import { Injectable } from '@angular/core';
import { Supplier } from '~models';
import { Apollo } from 'apollo-angular';

import { GlobalService } from '~global-services/_global/global.service';
import { SupplierQueries } from '~global-services/supplier/supplier.queries';
import { UserService } from '~global-services/user/user.service';
import { GlobalWithAuditService } from '~global-services/_global/global-with-audit.service';

@Injectable({ providedIn: 'root' })
export class SupplierService extends GlobalWithAuditService<Supplier> {

	constructor(apollo: Apollo protected userSrv: UserService) {
		super(wrapper, new SupplierQueries(), 'Supplier', userSrv);
	}

}
