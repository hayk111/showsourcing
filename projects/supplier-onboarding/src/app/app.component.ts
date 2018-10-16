import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { SupplierOnboardingClient } from '~shared/apollo/services/apollo-supplier-unboarding-client.class';

@Component({
	selector: 'app-root-onboarding',
	template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
	constructor(
		private authSrv: AuthenticationService,
		private supplierOnBoardingClient: SupplierOnboardingClient
	) { }

	ngOnInit() {
		this.authSrv.init();
		this.authSrv.login({
			identifier: 'supplier-onboarding',
			password: 'supplier-onboarding'
		}).subscribe(_ => this.supplierOnBoardingClient.init());
	}
}
