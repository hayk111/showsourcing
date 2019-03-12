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
	AuthFormBaseComponent,
	UnvalidatedEmailComponent,
	ValidateEmailComponent
} from './components';
import { routes } from './routes';
import { AuthHeaderTitleComponent } from './components/auth-header/auth-header-title/auth-header-title.component';
import { AuthHeaderSubtitleComponent } from './components/auth-header/auth-header-subtitle/auth-header-subtitle.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		AccountCreatedComponent,
		AuthFormBaseComponent,
		AuthFormHeaderComponent,
		ForgotPasswordComponent,
		LoginComponent,
		PwResettedComponent,
		RegistrationComponent,
		ResetPasswordComponent,
		UnvalidatedEmailComponent,
		ValidateEmailComponent,
		AuthHeaderTitleComponent,
		AuthHeaderSubtitleComponent
	],
	exports: [
		AuthFormBaseComponent,
		AuthFormHeaderComponent,
		AuthHeaderTitleComponent,
		AuthHeaderSubtitleComponent
	]
})
export class AuthPagesModule { }
