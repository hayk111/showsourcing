import { Routes } from '@angular/router';
import * as Pages from './pages';
import { HasCompanyGuard, HasTeamGuard } from './services';
import { AuthenticatedGuard } from '~core/auth/guards';


export const routes: Routes = [
	{ path: 'sign-in', component: Pages.SignInPageComponent },
	{ path: 'sign-up', component: Pages.SignUpPageComponent },
	{ path: 'confirm-sign-up', component: Pages.ConfirmSignUpPageComponent },
	{ path: 'forgot-password', component: Pages.ForgotPasswordPageComponent },
	{ path: 'forgot-password-submit', component: Pages.ForgotPasswordSubmitPageComponent },
	// { path: 'account-created', component: Pages.AccountCreatedPageComponent },
	{
		path: 'user',
		canActivateChild: [
			AuthenticatedGuard,
		],
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
		{
			path: 'create-a-company',
			component: Pages.CreateACompanyPageComponent
		}
	]}
];
