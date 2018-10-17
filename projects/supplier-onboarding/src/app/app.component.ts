import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { SupplierOnboardingClient } from '~shared/apollo/services/apollo-supplier-unboarding-client.class';
import { GlobalClientsInitializer } from '~shared/apollo';

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
		this.authSrv.init();
		this.authSrv.login({
			identifier: 'supplier-onboarding-user',
			password: 'supplier-onboarding-password'
		}).subscribe(_ => this.supplierOnBoardingClient.init());
		this.globalClients.init();
	}
}
