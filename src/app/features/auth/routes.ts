import { Routes } from '@angular/router';
import {
	AccountCreatedComponent,
	ForgotPasswordComponent,
	ResetPasswordComponent,
	LoginComponent,
	PwResettedComponent,
	RegistrationComponent,
} from '~features/auth/components';

export const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'forgot-password', component: ForgotPasswordComponent },
	{ path: 'reset-password/:token', component: ResetPasswordComponent },
	{ path: 'register', component: RegistrationComponent },
	{ path: 'password-resetted', component: PwResettedComponent },
	{ path: 'account-created', component: AccountCreatedComponent }
];
