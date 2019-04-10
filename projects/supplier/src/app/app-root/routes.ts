import { Route } from '@angular/router';
import { AuthenticatedGuard } from '~core/auth';
import { NotAuthenticatedGuard } from '~core/auth/services/not-authenticated-guard';
import { GuestTemplateComponent, TemplateComponent } from '../core/template';
import { GlobalRequestClientReadyGuard, UserClientReadyGuard } from '~core/apollo/guards/client-ready.guard.service';

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
			GlobalRequestClientReadyGuard,
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

