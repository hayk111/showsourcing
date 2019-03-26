import { Injectable } from '@angular/core';
import { Observable, from, of, forkJoin } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { SupplierService } from '~entity-services';
import { SupplierClaimService } from '~entity-services/supplier-claim/supplier-claim.service';
import { Supplier, SupplierClaim, Attachment } from '~models';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { UploaderService } from '~shared/file/services/uploader.service';
import { TokenState } from '~core/auth/interfaces/token-state.interface';
import { Credentials } from '~core/auth/interfaces/credentials.interface';
import { TokenService } from '~core/auth/services/token.service';
import { SupplierOnboardingClient } from '~core/apollo/services/apollo-supplier-unboarding-client.class';
import { GlobalDataClientsInitializer } from '~core/apollo';

@Injectable({
	providedIn: 'root'
})
export class OnBoardingService {
	private claim: SupplierClaim;
	initialized: boolean;
	credentials: Credentials = {
		identifier: 'supplier-onboarding-user',
		password: 'supplier-onboarding-password'
	};

	constructor(
		private supplierSrv: SupplierService,
		private uploader: UploaderService,
		private supplierClaimSrv: SupplierClaimService,
		private tokenSrv: TokenService,
		private onboardingClient: SupplierOnboardingClient,
		private globalDataClient: GlobalDataClientsInitializer
	) { }

	init() {
		this.claim = new SupplierClaim();
		// if the refresh token exist then we use that token, else we generate one
		// with an hardcoded user (ask antine if question)
		return from(this.tokenSrv.restoreRefreshToken('supplier-onboarding')).pipe(
			switchMap((token: TokenState) => {
				return token ? of(token) :
					this.tokenSrv.getRefreshToken(this.credentials, 'supplier-onboarding');
			}),
			switchMap((token: TokenState) => this.startClients(token)),
			switchMap(_ => this.supplierClaimSrv.create(this.claim)),
			tap(_ => this.initialized = true)
		);
	}

	private startClients(token: TokenState) {
		return forkJoin([
			this.onboardingClient.init(token),
			this.globalDataClient.init(token)
		]);
	}


	getClaim() {
		return this.claim;
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
