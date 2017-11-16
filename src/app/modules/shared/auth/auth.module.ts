import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthMockService } from './services/auth-mock.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AuthCardComponent } from './components/auth-card/auth-card.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AccountCreatedComponent } from './components/account-created/account-created.component';
import { CardsModule } from '../cards/cards.module';
import { InputsModule } from '../inputs/inputs.module';
import { MatIconModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { TokenService } from './services/token.service';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule,
		CardsModule,
		InputsModule,
		MatIconModule,
		MatProgressSpinnerModule,
		MatTabsModule
	],
	providers: [
		{ provide: AuthService, useClass: AuthService },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptorService,
			multi: true
		},
		AuthGuardService,
		TokenService
	],
	declarations: [ LoginComponent, AuthCardComponent, RegistrationComponent, AccountCreatedComponent, ForgotPasswordComponent ],
	exports: [  LoginComponent, AuthCardComponent, RegistrationComponent, AccountCreatedComponent ]
})
export class AuthModule {

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: AuthModule,
			providers: [ AuthService, AuthGuardService ]
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: AuthModule
		};
	}
}
