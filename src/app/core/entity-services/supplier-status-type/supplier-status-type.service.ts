import { Injectable } from '@angular/core';
import { GlobalService } from '~entity-services/_global/global.service';
import { SupplierStatusTypeQueries } from '~entity-services/supplier-status-type/supplier-status-type.queries';
import { SupplierStatusType } from '~models';
import { Apollo } from 'apollo-angular';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class SupplierStatusTypeService extends GlobalService<SupplierStatusType> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, SupplierStatusTypeQueries, 'supplierStatusType', 'supplierStatusTypes');
	}

}
