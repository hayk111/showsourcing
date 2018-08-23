import { Injectable } from '@angular/core';
import { GlobalService } from '~global-services/_global/global.service';
import { SupplierStatusTypeQueries } from '~global-services/supplier-status-type/supplier-status-type.queries';
import { SupplierStatusType } from '~models';
import { Apollo } from 'apollo-angular';


@Injectable({
	providedIn: 'root'
})
export class SupplierStatusTypeService extends GlobalService<SupplierStatusType> {

	constructor(protected apollo: Apollo) {
		super(apollo, SupplierStatusTypeQueries, 'supplierStatusType', 'supplierStatusTypes');
	}

}

