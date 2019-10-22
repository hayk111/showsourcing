import { Routes } from '@angular/router';

import {
	AccountCreatedPageComponent,
	ForgotPasswordPageComponent,
	LoginPageComponent,
	PwResettedPageComponent,
	RegistrationPageComponent,
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
	{ path: 'login', component: LoginPageComponent },
	{ path: 'forgot-password', component: ForgotPasswordPageComponent },
	{ path: 'reset-password/:token', component: ResetPasswordPageComponent },
	{ path: 'register', component: RegistrationPageComponent },
	{ path: 'password-resetted', component: PwResettedPageComponent },
	{ path: 'account-created', component: AccountCreatedPageComponent },
	{ path: 'validate-email/:token', component: ValidateEmailPageComponent },
	{ path: 'unvalidated-email', component: UnvalidatedEmailPageComponent },
	{
		path: 'user',
		canActivateChild: [AuthenticatedGuard, CentralClientReadyGuard],
		data: { showLogout: true },
		children: [
		{
			path: '',
			redirectTo: 'pick-a-team',
			pathMatch: 'full'
		},
		{
			path: 'create-a-team',
			component: CreateATeamPageComponent,
			canActivate: [HasCompanyGuard]
		},
		{
			path: 'pick-a-team',
			component: PickATeamPageComponent,
			canActivate: [HasTeamGuard]
		},
		{ path: 'create-a-company', component: CreateACompanyPageComponent }
	]}
];
