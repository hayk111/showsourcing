import { Injectable } from '@angular/core';

import { SupplierStatusQueries } from '~core/erm/services/supplier-status/supplier-status.queries';
import { SupplierStatus } from '~core/erm/models';

import { GlobalService } from '../_global/global.service';


@Injectable({
	providedIn: 'root'
})
export class SupplierStatusService extends GlobalService<SupplierStatus> {

	constructor() {
		super(SupplierStatusQueries, 'supplierStatus', 'supplierStatuses');
	}

}

