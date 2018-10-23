import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { SupplierOnboardingClient } from '~shared/apollo/services/apollo-supplier-unboarding-client.class';
import { GlobalClientsInitializer } from '~shared/apollo';
import { switchMap } from 'rxjs/operators';
import { AuthStatus } from '~features/auth';
import { of, combineLatest } from 'rxjs';

@Component({
	selector: 'app-root-onboarding',
	template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
	constructor(
		private authSrv: AuthenticationService,
		private supplierOnBoardingClient: SupplierOnboardingClient,
		private globalClients: GlobalClientsInitializer
	) { }

	ngOnInit() {
		// we init the auth srv which is gonna authenticate
		// if there is a token present else we authenticate the user
		// with hard coded credentials (ask Antoine why)
		this.authSrv.init();
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
