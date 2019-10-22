import { Routes } from '@angular/router';

import {
	AccountCreatedPageComponent,
	ForgotPasswordPageComponent,
	LoginPageComponent,
	PasswordResettedPageComponent,
	RegisterPageComponent,
	ResetPasswordPageComponent,
	UnvalidatedEmailPageComponent,
	ValidateEmailPageComponent,
	CreateATeamPageComponent,
	PickATeamPageComponent,
	CreateACompanyPageComponent,
} from './pages';
import { HasCompanyGuard, HasTeamGuard } from './services';
import { AuthenticatedGuard } from '~core/auth';
import { CentralClientReadyGuard } from '~core/apollo/guards/client-ready.guard.service';

export const routes: Routes = [
	{ path: 'account-created', component: AccountCreatedPageComponent },
	{ path: 'forgot-password', component: ForgotPasswordPageComponent },
	{ path: 'login', component: LoginPageComponent },
	{ path: 'password-resetted', component: PasswordResettedPageComponent },
	{ path: 'register', component: RegisterPageComponent },
	{ path: 'reset-password/:token', component: ResetPasswordPageComponent },
	{ path: 'unvalidated-email', component: UnvalidatedEmailPageComponent },
	{ path: 'validate-email/:token', component: ValidateEmailPageComponent },
	{
		path: 'user',
		canActivateChild: [AuthenticatedGuard, CentralClientReadyGuard],
		children: [
		{
			path: '',
			redirectTo: 'pick-a-team',
			pathMatch: 'full',
		},
		{
			path: 'create-a-team',
			component: CreateATeamPageComponent,
			canActivate: [HasCompanyGuard],
		},
		{
			path: 'pick-a-team',
			component: PickATeamPageComponent,
			canActivate: [HasTeamGuard],
		},
		{ path: 'create-a-company', component: CreateACompanyPageComponent }
	]}
];
