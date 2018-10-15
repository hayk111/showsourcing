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
import { OnBoardingModule } from '~features/on-boarding';



@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([]),
		ReactiveFormsModule,
		OnBoardingModule
	],
	declarations: [
		LoginComponent,
		RegistrationComponent,
		AccountCreatedComponent,
		ForgotPasswordComponent,
		ResetPasswordComponent,
		PwResettedComponent,
	],
	exports: [],
})
export class AuthModule {

}
