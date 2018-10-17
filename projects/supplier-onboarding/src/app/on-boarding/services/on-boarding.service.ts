import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplierService } from '~global-services';
import { SupplierClaimService } from '~global-services/supplier-claim/supplier-claim.service';
import { Supplier, SupplierClaim } from '~models';

@Injectable({
	providedIn: 'root'
})
export class OnBoardingService {
	private claim: SupplierClaim;

	constructor(
		private supplierSrv: SupplierService,
		private supplierClaimSrv: SupplierClaimService
	) { }

	init() {
		this.claim = new SupplierClaim();
		this.supplierClaimSrv.create(this.claim);
	}

	updateClaim(addedValues: any) {
		this.claim = { ...this.claim, ...addedValues };
		this.supplierClaimSrv.update({ id: this.claim, ...addedValues });
	}

	searchSuppliers(search: string): Observable<Supplier[]> {
		return this.supplierSrv.queryMany({ query: `name CONTAINS[c] "${search}"` });
	}
}
