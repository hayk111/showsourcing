import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { SupplierOnboardingClient } from '~shared/apollo/services/apollo-supplier-unboarding-client.class';
import { switchMap } from 'rxjs/operators';
import { AuthStatus, TokenService, Credentials } from '~features/auth';
import { of, combineLatest } from 'rxjs';
import { GlobalDataClientsInitializer } from '~shared/apollo';
import { CredentialDetails } from 'crypto';

@Component({
	selector: 'app-root-onboarding',
	template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
	credentials: Credentials = {
		identifier: 'supplier-onboarding-user',
		password: 'supplier-onboarding-password'
	};

	constructor(
		private tokenSrv: TokenService,
		private supplierOnBoardingClient: SupplierOnboardingClient,
		private globalDataClient: GlobalDataClientsInitializer
	) { }

	ngOnInit() {
		// we init the auth srv which is gonna authenticate
		// if there is a token present else we authenticate the user
		// with hard coded credentials (ask Antoine why)
		this.tokenSrv.getRefreshToken(this.credentials).pipe(
			switchMap(token => )
		);
		this.authSrv.authStatus$.pipe(
			switchMap((status: AuthStatus) => {
				if (status === AuthStatus.NOT_AUTHENTICATED) {
					return this.authSrv.login({
						identifier: 'supplier-onboarding-user',
						password: 'supplier-onboarding-password'
					}) as any;
				} else {
					return of(true);
				}
			})
		).subscribe();
		this.supplierOnBoardingClient.init();
		this.globalClients.init();
	}
}
