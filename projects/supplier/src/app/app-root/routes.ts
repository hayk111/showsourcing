import { Route } from '@angular/router';
import { AuthenticatedGuard } from '~core/auth';
import { NotAuthenticatedGuard } from '~core/auth/services/not-authenticated-guard';
import { GuestTemplateComponent, TemplateComponent } from '../core/template';
import { GlobalRequestClientReadyGuard, UserClientReadyGuard } from '~core/apollo/guards/client-ready.guard.service';
import { AnonymouslyAuthenticatedGuard } from '~core/auth/services/anonymously-authenticated.guard';

export const routes: Array<Route> = [
	{
		path: 'auth',
		component: GuestTemplateComponent,
		canActivateChild: [NotAuthenticatedGuard],
		loadChildren: './../features/auth-pages/auth-pages-wrapper.module#AuthPagesWrapperModule'
	},
	// need wrapper :()
	// {
	// 	path: 'error',
	// 	component: GuestTemplateComponent,
	// 	loadChildren: 'app/features/error-pages/error-pages.module#ErrorPagesModule'
	// },
	{
		path: 'anonymous',
		component: GuestTemplateComponent,
		canActivateChild: [
			AnonymouslyAuthenticatedGuard,
			GlobalRequestClientReadyGuard
		],
		children: [
			{ path: '', redirectTo: 'request', pathMatch: 'full' },
			{ path: 'request', loadChildren: './../features/request/request.module#RequestModule' },
		]
	},
	{
		path: '',
		component: TemplateComponent,
		canActivateChild: [
			AuthenticatedGuard,
			GlobalRequestClientReadyGuard,
			UserClientReadyGuard
		],
		children: [
			{ path: '', redirectTo: 'request', pathMatch: 'full' },
			{
				path: 'request',
				loadChildren: './../features/request/request.module#RequestModule'
			},
		]
	},
	{ path: '**', redirectTo: '' }
];

