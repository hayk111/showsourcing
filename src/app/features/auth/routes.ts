import { Routes } from '@angular/router';
import { AuthenticatedGuard } from '~core/auth';
import * as Pages from './pages';
import { HasCompanyGuard, HasTeamGuard } from './services';


export const routes: Routes = [
	{ path: 'account-created', component: Pages.AccountCreatedPageComponent },
	{ path: 'forgot-password', component: Pages.ForgotPasswordPageComponent },
	{ path: 'login', component: Pages.LoginPageComponent },
	{ path: 'password-resetted', component: Pages.PasswordResettedPageComponent },
	{ path: 'register', component: Pages.RegisterPageComponent },
	{ path: 'reset-password/:token', component: Pages.ResetPasswordPageComponent },
	{ path: 'unvalidated-email', component: Pages.UnvalidatedEmailPageComponent },
	{ path: 'validate-email/:token', component: Pages.ValidateEmailPageComponent },
	{ path: 'confirm-email', component: Pages.ConfirmEmailPageComponent },
	{
		path: 'user',
		canActivateChild: [AuthenticatedGuard],
		children: [
		{
			path: '',
			redirectTo: 'pick-a-team',
			pathMatch: 'full',
		},
		{
			path: 'create-a-team',
			component: Pages.CreateATeamPageComponent,
			canActivate: [HasCompanyGuard],
		},
		{
			path: 'pick-a-team',
			component: Pages.PickATeamPageComponent,
			canActivate: [HasTeamGuard],
		},
		{ path: 'create-a-company', component: Pages.CreateACompanyPageComponent }
	]}
];
