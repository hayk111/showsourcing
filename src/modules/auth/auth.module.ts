import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from './services/auth-guard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components';
import { AuthCardComponent } from './containers';
import { RegistrationComponent } from './components';
import { AccountCreatedComponent } from './components';
import { ForgotPasswordComponent } from './components';
import { TokenInterceptorService, TokenService } from './services';
import { PwResettedComponent } from './components';
import { InputsModule } from '~shared/inputs';
import { LoadersModule } from '~shared/loaders';
import { TabsModule } from '~shared/tabs';
import { CardModule } from '~shared/card';
import { AuthService } from '~auth/services';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		InputsModule,
		LoadersModule,
		TabsModule,
		CardModule
	],
	providers: [
		AuthService,
		TokenService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptorService,
			multi: true
		},
		AuthGuardService,
	],
	declarations: [ LoginComponent, AuthCardComponent, RegistrationComponent, AccountCreatedComponent,
			ForgotPasswordComponent, PwResettedComponent ],
	exports: [  LoginComponent, AuthCardComponent, RegistrationComponent, AccountCreatedComponent ]
})
export class AuthModule {

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: AuthModule,
			providers: [ AuthGuardService ]
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: AuthModule
		};
	}
}
