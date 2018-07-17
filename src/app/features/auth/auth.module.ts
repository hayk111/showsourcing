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
} from './components';



@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([]),
		ReactiveFormsModule,
	],
	declarations: [
		LoginComponent,
		RegistrationComponent,
		AccountCreatedComponent,
		ForgotPasswordComponent,
		PwResettedComponent,
	],
	exports: [
		// RouterModule
	],
})
export class AuthModule {

}
