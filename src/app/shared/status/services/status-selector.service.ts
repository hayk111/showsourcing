import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductStatusService, SupplierStatusService } from '~global-services';
import { ProductStatus, SupplierStatus } from '~models';




@Injectable({
	providedIn: 'root'
})
export class StatusSelectorService {

	constructor(
		private productStatusSrv: ProductStatusService,
		private supplierStatusSrv: SupplierStatusService) { }

	getSupplierStatuses(): Observable<SupplierStatus[]> {
		return this.supplierStatusSrv.selectAll();
	}

	getProductStatuses(): Observable<ProductStatus[]> {
		return this.productStatusSrv.selectAll();
	}

}
