import { Routes } from '@angular/router';
import {
	AccountCreatedComponent,
	ForgotPasswordComponent,
	LoginComponent,
	PwResettedComponent,
	RegistrationComponent,
	ResetPasswordComponent,
} from './components';

export const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'forgot-password', component: ForgotPasswordComponent },
	{ path: 'reset-password/:token', component: ResetPasswordComponent },
	{ path: 'register', component: RegistrationComponent },
	{ path: 'password-resetted', component: PwResettedComponent },
	{ path: 'account-created', component: AccountCreatedComponent }
];
