import { Injectable } from '@angular/core';
import { SupplierType } from '~models';
import { GqlClient } from '~shared/apollo';
import { GlobalService } from '../_global/global.service';
import { SupplierTypeQueries } from './supplier-type.queries';


@Injectable({
	providedIn: 'root'
})
export class SupplierTypeService extends GlobalService<SupplierType> {

	constructor(protected gqlClient: GqlClient) {
		super(gqlClient, new SupplierTypeQueries(), 'SupplierType');
	}

}
