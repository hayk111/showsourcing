import { Routes } from '@angular/router';
import {
	AccountCreatedComponent,
	ForgotPasswordComponent,
	LoginComponent,
	PwResettedComponent,
	RegistrationComponent,
	ResetPasswordComponent,
} from '~features/auth/components';
import { OnBoardingPageComponent } from '~features/on-boarding';
import { routes as boardRoutes } from '~features/on-boarding/routes';

export const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'forgot-password', component: ForgotPasswordComponent },
	{ path: 'reset-password/:token', component: ResetPasswordComponent },
	{ path: 'register', component: RegistrationComponent },
	{ path: 'password-resetted', component: PwResettedComponent },
	{ path: 'account-created', component: AccountCreatedComponent },
	{
		path: 'supplier',
		component: OnBoardingPageComponent,
		children: [
			...boardRoutes
		]
	}
];
