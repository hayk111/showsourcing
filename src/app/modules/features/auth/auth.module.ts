import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from './services/auth-guard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AuthCardComponent } from './components/auth-card/auth-card.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AccountCreatedComponent } from './components/account-created/account-created.component';
import { InputsModule } from '../inputs/inputs.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { CardsModule } from '../cards/cards.module';
import { LoadersModule } from '../loaders/loaders.module';
import { TabsModule } from '../tabs/tabs.module';
import { PwResettedComponent } from './components/pw-resetted/pw-resetted.component';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		InputsModule,
		LoadersModule,
		TabsModule,
		CardsModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptorService,
			multi: true
		},
		AuthGuardService,
	],
	declarations: [ LoginComponent, AuthCardComponent, RegistrationComponent, AccountCreatedComponent, ForgotPasswordComponent, PwResettedComponent ],
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
