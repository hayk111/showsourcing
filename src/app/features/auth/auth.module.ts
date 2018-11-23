import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';

import {
	AccountCreatedComponent,
	ForgotPasswordComponent,
	LoginComponent,
	PwResettedComponent,
	RegistrationComponent,
	ResetPasswordComponent
} from '~features/auth/components';
import { routes } from './routes';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule
	],
	declarations: [
		LoginComponent,
		RegistrationComponent,
		AccountCreatedComponent,
		ForgotPasswordComponent,
		ResetPasswordComponent,
		PwResettedComponent
	],
	exports: []
})
export class AuthModule { }
