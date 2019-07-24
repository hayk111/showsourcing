import { Component, OnInit } from '@angular/core';
import { of, from, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthStatus, Credentials, TokenService } from '~core/auth';
import { GlobalDataClientsInitializer } from '~core/apollo';
import { SupplierOnboardingClient } from '~deprecated/apollo-supplier-unboarding-client.class';
import { TokenState } from '~core/auth/interfaces/token-state.interface';

@Component({
	selector: 'app-root-onboarding',
	template: '<router-outlet></router-outlet>',
})
export class AppOnboardingComponent {


}
