import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SupplierService } from '~global-services';
import { SupplierClaimService } from '~global-services/supplier-claim/supplier-claim.service';
import { Supplier, SupplierClaim, Attachment } from '~models';
import { Client } from '~shared/apollo/services/apollo-client-names.const';
import { UploaderService } from '~shared/file/services/uploader.service';
@Injectable({
	providedIn: 'root'
})
export class OnBoardingService {
	private claim: SupplierClaim;
	initialized: boolean;

	constructor(
		private supplierSrv: SupplierService,
		private uploader: UploaderService,
		private supplierClaimSrv: SupplierClaimService
	) { }

	getClaim() {
		return this.claim;
	}

	init() {
		this.claim = new SupplierClaim();
		return this.supplierClaimSrv.create(this.claim).pipe(
			tap(_ => this.initialized = true)
		);
	}

	updateClaim(addedValues: any) {
		this.claim = { ...this.claim, ...addedValues };
		return this.supplierClaimSrv.update({ id: this.claim.id, ...addedValues });
	}

	searchSuppliers(search: string): Observable<Supplier[]> {
		return this.supplierSrv.queryMany(
			{ query: `name CONTAINS[c] "${search}"` },
			`name, countryCode, supplierImage { id, fileName, orientation, imageType}, addressFull, website, city, emailAddress, phone, description`,
			Client.GLOBAL_DATA);
	}

	uploadFiles(files: File[]): Observable<any> {
		return this.uploader.uploadFiles(files, undefined, Client.SUPPLIER_ONBOARDING);
	}
}
