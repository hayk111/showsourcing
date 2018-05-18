import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthHttpService } from '~features/auth/services';
import { CardModule } from '~shared/card';
import { InputsModule } from '~shared/inputs';
import { LoadersModule } from '~shared/loaders';
import { TabsModule } from '~shared/tabs';

import {
	AccountCreatedComponent,
	ForgotPasswordComponent,
	LoginComponent,
	PwResettedComponent,
	RegistrationComponent,
} from './components';
import { TokenInterceptorService, TokenService } from './services';
import { AuthGuardService } from './services/auth-guard.service';
import { IconsModule } from '~shared/icons';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { SharedModule } from '~shared/shared.module';
import { AuthenticationService } from '~features/auth/services/authentication.service';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([]),
		ReactiveFormsModule,
	],
	providers: [
		AuthHttpService,
		TokenService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptorService,
			multi: true,
		},
		AuthGuardService,
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
