import { Routes } from '@angular/router';
import { GuestTemplateComponent } from '~shared/template/components/guest-template/guest-template.component';
import { LoginComponent, ForgotPasswordComponent, RegistrationComponent, PwResettedComponent, AccountCreatedComponent } from '~features/auth/components';

export const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'forgot-password', component: ForgotPasswordComponent },
	{ path: 'register', component: RegistrationComponent },
	{ path: 'password-resetted', component: PwResettedComponent },
	{ path: 'account-created', component: AccountCreatedComponent }
];
