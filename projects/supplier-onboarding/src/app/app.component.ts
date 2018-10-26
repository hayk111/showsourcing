import { Component, OnInit } from '@angular/core';
import { of, from, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthStatus, Credentials, TokenService } from '~features/auth';
import { GlobalDataClientsInitializer } from '~shared/apollo';
import { SupplierOnboardingClient } from '~shared/apollo/services/apollo-supplier-unboarding-client.class';
import { TokenState } from '~features/auth/interfaces/token-state.interface';

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
		// if the refresh token exist then we use that token, else we generate one
		// with an hardcoded user (ask antine if question)
		from(this.tokenSrv.restoreRefreshToken('supplier-onboarding')).pipe(
			switchMap((token: TokenState) => {
				return token ? of(token) :
					this.tokenSrv.getRefreshToken(this.credentials, 'supplier-onboarding');
			}),
			switchMap((token: TokenState) => this.startClients(token))
		).subscribe();
	}

	private startClients(token: TokenState) {
		return forkJoin([
			this.supplierOnBoardingClient.init(token),
			this.globalDataClient.init(token)
		]);
	}
}
