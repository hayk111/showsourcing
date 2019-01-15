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
	AuthFormHeaderComponent,
	AuthFormBaseComponent
} from './components';
import { routes } from './routes';
import { ValidateEmailComponent } from './components/validate-email/validate-email.component';
import { UnvalidatedEmailComponent } from './components/unvalidated-email/unvalidated-email.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		LoginComponent,
		RegistrationComponent,
		AccountCreatedComponent,
		ForgotPasswordComponent,
		ResetPasswordComponent,
		PwResettedComponent,
		AuthFormHeaderComponent,
		AuthFormBaseComponent,
		ValidateEmailComponent,
		UnvalidatedEmailComponent
	],
	exports: [AuthFormBaseComponent]
})
export class AuthPagesModule { }
