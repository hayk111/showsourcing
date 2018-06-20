import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthHttpService } from '~features/auth/services/auth-http.service';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { UnauthGuardService } from '~features/auth/services/unauth-guard.service';
import { SharedModule } from '~shared/shared.module';

import {
	AccountCreatedComponent,
	ForgotPasswordComponent,
	LoginComponent,
	PwResettedComponent,
	RegistrationComponent,
} from './components';
import { TokenService } from './services';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([]),
		ReactiveFormsModule,
	],
	providers: [
		AuthHttpService,
		TokenService,
		AuthGuardService,
		UnauthGuardService
	],
	declarations: [
		LoginComponent,
		RegistrationComponent,
		AccountCreatedComponent,
		ForgotPasswordComponent,
		PwResettedComponent,
	],
	exports: [
		// RouterModule
	],
})
export class AuthModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: AuthModule,
			providers: [AuthGuardService, AuthenticationService],
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: AuthModule,
		};
	}
}
