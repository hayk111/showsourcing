import { Injectable } from '@angular/core';
import { SupplierType } from '~models';
import { ApolloClient } from '~shared/apollo';
import { GlobalService } from '../_global/global.service';
import { SupplierTypeQueries } from './supplier-type.queries';


@Injectable({
	providedIn: 'root'
})
export class SupplierTypeService extends GlobalService<SupplierType> {

	constructor(protected apollo: ApolloClient) {
		super(apollo, new SupplierTypeQueries(), 'SupplierType');
	}

}
