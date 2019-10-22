import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';

import {
	AccountCreatedComponent,
	ForgotPasswordComponent,
	LoginComponent,
	PwResettedComponent,
	RegistrationComponent,
	ResetPasswordComponent,
	UnvalidatedEmailComponent,
	ValidateEmailComponent,
} from './components';
import { routes } from './routes';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		AccountCreatedComponent,
		ForgotPasswordComponent,
		LoginComponent,
		PwResettedComponent,
		RegistrationComponent,
		ResetPasswordComponent,
		UnvalidatedEmailComponent,
		ValidateEmailComponent,
	],
	exports: []
})
export class AuthPagesModule { }
