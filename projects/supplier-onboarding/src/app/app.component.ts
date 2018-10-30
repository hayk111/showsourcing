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
export class AppComponent {


}
