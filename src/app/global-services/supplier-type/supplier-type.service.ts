import { Injectable } from '@angular/core';
import { SupplierType } from '~models';
import { ApolloWrapper } from '~shared/apollo/services/apollo-wrapper.service';
import { GlobalService } from '~global-services/_global/global.service';
import { SupplierTypeQueries } from '~global-services/supplier-type/supplier-type.queries';


@Injectable({
	providedIn: 'root'
})
export class SupplierTypeService extends GlobalService<SupplierType> {

	constructor(wrapper: ApolloWrapper) {
		super(wrapper, new SupplierTypeQueries(), 'SupplierType');
	}

}
