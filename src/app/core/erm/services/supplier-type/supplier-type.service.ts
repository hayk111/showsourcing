import { Injectable } from '@angular/core';
import { SupplierType } from '~core/erm/models';
import { SupplierTypeQueries } from '~core/erm/services/supplier-type/supplier-type.queries';
import { GlobalService } from '~core/erm/services/_global/global.service';



@Injectable({
	providedIn: 'root'
})
export class SupplierTypeService extends GlobalService<SupplierType> {

	constructor() {
		super(SupplierTypeQueries, 'supplierType', 'supplierTypes');
	}

}
