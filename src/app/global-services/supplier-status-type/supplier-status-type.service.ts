import { Injectable } from '@angular/core';
import { GlobalService } from '~global-services/_global/global.service';
import { SupplierStatusTypeQueries } from '~global-services/supplier-status-type/supplier-status-type.queries';
import { SupplierStatusType } from '~models';
import { Apollo } from 'apollo-angular';
import { ApolloStateService } from '~shared/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class SupplierStatusTypeService extends GlobalService<SupplierStatusType> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, SupplierStatusTypeQueries, 'supplierStatusType', 'supplierStatusTypes');
	}

}

