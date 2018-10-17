import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '~models';
import { SupplierService } from '~global-services';

@Injectable({
	providedIn: 'root'
})
export class OnBoardingService {

	constructor(
		private supplierSrv: SupplierService
	) { }

	searchSuppliers(search: string): Observable<Supplier[]> {
		return this.supplierSrv.queryMany({ query: `name CONTAINS[c] "${search}"` });
	}
}
