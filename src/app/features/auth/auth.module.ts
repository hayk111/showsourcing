import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '~auth/services';
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
import { AuthCardComponent } from './containers';
import { TokenInterceptorService, TokenService } from './services';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
	imports: [CommonModule, ReactiveFormsModule, InputsModule, LoadersModule, TabsModule, CardModule],
	providers: [
		AuthService,
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
		AuthCardComponent,
		RegistrationComponent,
		AccountCreatedComponent,
		ForgotPasswordComponent,
		PwResettedComponent,
	],
	exports: [LoginComponent, AuthCardComponent, RegistrationComponent, AccountCreatedComponent],
})
export class AuthModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: AuthModule,
			providers: [AuthGuardService],
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: AuthModule,
		};
	}
}
