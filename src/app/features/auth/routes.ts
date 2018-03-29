import { Routes } from '@angular/router';
import { GuestTemplateComponent } from '~app/shared/template/components/guest-template/guest-template.component';
import { LoginComponent, ForgotPasswordComponent, RegistrationComponent, PwResettedComponent, AccountCreatedComponent } from './components';

export const routes: Routes = [
	{
		path: 'guest', component: GuestTemplateComponent, children: [
			{ path: 'login', component: LoginComponent },
			{ path: 'forgot-password', component: ForgotPasswordComponent },
			{ path: 'register', component: RegistrationComponent },
			{ path: 'password-resetted', component: PwResettedComponent },
			{ path: 'account-created', component: AccountCreatedComponent }
		]
	}
];
