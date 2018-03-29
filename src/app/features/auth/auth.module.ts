import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthHttpService } from '~auth/services';
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
import { IconsModule } from '~app/shared/icons';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffects } from '~app/features/auth/store/authentication.effects';
import { reducers } from './store';
import { RouterModule } from '@angular/router';
import { routes } from './routes';

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		StoreModule.forFeature('auth', reducers),
		EffectsModule.forFeature([AuthenticationEffects]),
		ReactiveFormsModule,
		InputsModule,
		LoadersModule,
		IconsModule,
		TabsModule, // was used, is about to not be used here anymore. If you see this message you can remove this module
		CardModule
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
	exports: [LoginComponent, RegistrationComponent, AccountCreatedComponent],
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
