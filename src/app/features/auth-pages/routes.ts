import { Routes } from '@angular/router';
import {
	AccountCreatedComponent,
	ForgotPasswordComponent,
	LoginComponent,
	PwResettedComponent,
	RegistrationComponent,
	ResetPasswordComponent,
} from './components';
import { ValidateEmailComponent } from './components/validate-email/validate-email.component';
import { UnvalidatedEmailComponent } from './components/unvalidated-email/unvalidated-email.component';

export const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'forgot-password', component: ForgotPasswordComponent },
	{ path: 'reset-password/:token', component: ResetPasswordComponent },
	{ path: 'register', component: RegistrationComponent },
	{ path: 'password-resetted', component: PwResettedComponent },
	{ path: 'account-created', component: AccountCreatedComponent },
	{ path: 'validate-email/:token', component: ValidateEmailComponent },
	{ path: 'unvalidated-email', component: UnvalidatedEmailComponent }
];
