import { Routes } from '@angular/router';

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

export const routes: Routes = [
	{ path: 'login', component: LoginComponent, canActivate: [NotAuthenticatedGuard] },
	{ path: 'forgot-password', component: ForgotPasswordComponent },
	{ path: 'reset-password/:token', component: ResetPasswordComponent },
	{ path: 'register', component: RegistrationComponent, canActivate: [NotAuthenticatedGuard] },
	{ path: 'password-resetted', component: PwResettedComponent },
	{ path: 'account-created', component: AccountCreatedComponent, canActivate: [NotAuthenticatedGuard] },
	{ path: 'validate-email/:token', component: ValidateEmailComponent, canActivate: [NotAuthenticatedGuard] },
	{ path: 'unvalidated-email', component: UnvalidatedEmailComponent, canActivate: [NotAuthenticatedGuard] }
];
