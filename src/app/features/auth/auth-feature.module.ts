import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';

import {
	AccountCreatedPageComponent,
	ForgotPasswordPageComponent,
	LoginPageComponent,
	PwResettedPageComponent,
	RegistrationPageComponent,
	ResetPasswordPageComponent,
	UnvalidatedEmailPageComponent,
	ValidateEmailPageComponent,
	PickATeamPageComponent,
	CreateATeamPageComponent,
	CreateACompanyPageComponent
} from './pages';
import { routes } from './routes';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		AccountCreatedPageComponent,
		ForgotPasswordPageComponent,
		LoginPageComponent,
		PwResettedPageComponent,
		RegistrationPageComponent,
		ResetPasswordPageComponent,
		UnvalidatedEmailPageComponent,
		ValidateEmailPageComponent,
		PickATeamPageComponent,
		CreateATeamPageComponent,
		CreateACompanyPageComponent
	],
	exports: []
})
export class AuthFeatureModule { }
