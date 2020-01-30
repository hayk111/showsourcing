import { Injectable } from '@angular/core';
import { SupplierType } from '~core/orm/models';
import { Apollo } from 'apollo-angular';
import { GlobalService } from '~core/orm/services/_global/global.service';
import { SupplierTypeQueries } from '~core/orm/services/supplier-type/supplier-type.queries';
import { ApolloStateService } from '~core/apollo/services/apollo-state.service';


@Injectable({
	providedIn: 'root'
})
export class SupplierTypeService extends GlobalService<SupplierType> {

	constructor(protected apolloState: ApolloStateService) {
		super(apolloState, SupplierTypeQueries, 'supplierType', 'supplierTypes');
	}

}
