import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SupplierService } from '~global-services';
import { SupplierClaimService } from '~global-services/supplier-claim/supplier-claim.service';
import { Supplier, SupplierClaim } from '~models';
import { Client } from '~shared/apollo/services/apollo-client-names.const';

@Injectable({
	providedIn: 'root'
})
export class OnBoardingService {
	private claim: SupplierClaim;
	initialized: boolean;

	constructor(
		private supplierSrv: SupplierService,
		private supplierClaimSrv: SupplierClaimService
	) { }

	init() {
		this.claim = new SupplierClaim();
		return this.supplierClaimSrv.create(this.claim).pipe(
			tap(_ => this.initialized = true)
		);
	}

	updateClaim(addedValues: any) {
		this.claim = { ...this.claim, ...addedValues };
		this.supplierClaimSrv.update({ id: this.claim, ...addedValues });
	}

	searchSuppliers(search: string): Observable<Supplier[]> {
		return this.supplierSrv.queryMany({ query: `name CONTAINS[c] "${search}"` },
			`name, countryCode, supplierImage { id, fileName, orientation, imageType}`, Client.GLOBAL_DATA);
	}
}
