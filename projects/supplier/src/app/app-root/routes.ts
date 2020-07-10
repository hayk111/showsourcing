import { Route } from '@angular/router';
// import { GlobalRequestClientReadyGuard } from '~core';
import { AuthenticatedGuard } from '~core/auth';
import { NotAuthenticatedGuard } from '~core/auth/guards/not-authenticated.guard';

import { GuestTemplateComponent, TemplateComponent } from '../core/template';

export const routes: Array<Route> = [
	{
		path: 'auth',
		component: GuestTemplateComponent,
		canActivateChild: [NotAuthenticatedGuard],
		loadChildren: './../features/auth-pages/auth-pages-wrapper.module#AuthPagesWrapperModule'
	},
	{
		path: 'error',
		component: GuestTemplateComponent,
		loadChildren: './../features/error-pages/error-pages-wrapper.module#ErrorPagesWrapperModule'
	},
	{
		path: '',
		component: TemplateComponent,
		canActivateChild: [
			AuthenticatedGuard,
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

