import { Injectable } from '@angular/core';
import { GlobalService } from '~global-services/_global/global.service';
import { SupplierStatusTypeQueries } from '~global-services/supplier-status-type/supplier-status-type.queries';
import { SupplierStatusType } from '~models';
import { Apollo } from 'apollo-angular';
import { ApolloStateService } from '~shared/apollo';


@Injectable({
	providedIn: 'root'
})
export class SupplierStatusTypeService extends GlobalService<SupplierStatusType> {

	constructor(protected apollo: Apollo, protected apolloState: ApolloStateService) {
		super(apollo, apolloState, SupplierStatusTypeQueries, 'supplierStatusType', 'supplierStatusTypes');
	}

}

