import { Injectable } from '@angular/core';
import { GlobalService } from '~global-services/_global/global.service';
import { SupplierStatusTypeQueries } from '~global-services/supplier-status-type/supplier-status-type.queries';
import { SupplierStatusType } from '~models';
import { ApolloWrapper } from '~shared/apollo';


@Injectable({
	providedIn: 'root'
})
export class SupplierStatusTypeService extends GlobalService<SupplierStatusType> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new SupplierStatusTypeQueries(), 'SupplierStatusType');
	}

}

