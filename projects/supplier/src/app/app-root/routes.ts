import { Route } from '@angular/router';
import { AuthenticatedGuard } from '~core/auth';
import { NotAuthenticatedGuard } from '~core/auth/services/not-authnticated-guard';
import { GuestTemplateComponent, TemplateComponent } from '~core/template';
import { GlobalRequestClientReadyGuard } from '~core/apollo/guards/client-ready.guard.service';

export const routes: Array<Route> = [
	{
		path: 'auth',
		component: GuestTemplateComponent,
		canActivateChild: [NotAuthenticatedGuard],
		loadChildren: '../../src/app/features/auth-pages/auth-pages.module#AuthPagesModule'
	},
	{
		path: 'error',
		component: GuestTemplateComponent,
		loadChildren: 'app/features/error-pages/error-pages.module#ErrorPagesModule'
	},
	{
		path: '',
		component: TemplateComponent,
		canActivateChild: [
			AuthenticatedGuard,
			GlobalRequestClientReadyGuard
		],
		children: [
			{ path: '', redirectTo: 'request', pathMatch: 'full' },
			{ path: 'request', loadChildren: 'app/features/request/request.module#RequestModule' },
		]
	},
	{ path: '**', redirectTo: '' }
];

