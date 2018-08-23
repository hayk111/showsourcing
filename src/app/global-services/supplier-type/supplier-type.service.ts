import { Injectable } from '@angular/core';
import { SupplierType } from '~models';
import { Apollo } from 'apollo-angular';
import { GlobalService } from '~global-services/_global/global.service';
import { SupplierTypeQueries } from '~global-services/supplier-type/supplier-type.queries';


@Injectable({
	providedIn: 'root'
})
export class SupplierTypeService extends GlobalService<SupplierType> {

	constructor(protected apollo: Apollo) {
		super(apollo, new SupplierTypeQueries(), 'SupplierType');
	}

}
