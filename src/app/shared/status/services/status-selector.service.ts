import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductStatusTypeService, SupplierStatusService } from '~global-services';
import { SupplierStatus, ProductStatusType } from '~models';




@Injectable({
	providedIn: 'root'
})
export class StatusSelectorService {

	constructor(
		private productStatusTypeSrv: ProductStatusTypeService,
		private supplierStatusSrv: SupplierStatusService) { }

	getSupplierStatuses(): Observable<SupplierStatus[]> {
		return this.supplierStatusSrv.selectAll();
	}

	getProductStatuses(): Observable<ProductStatusType[]> {
		return this.productStatusTypeSrv.selectAll();
	}

}
