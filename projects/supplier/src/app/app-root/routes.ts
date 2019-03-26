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
		loadChildren: './../features/auth-pages/auth-pages-wrapper.module#AuthPagesWrapperModule'
	},
	{
		path: '',
		component: GuestTemplateComponent,
		canActivateChild: [
			AuthenticatedGuard,
			GlobalRequestClientReadyGuard
		],
		children: [
			{ path: '', redirectTo: 'request', pathMatch: 'full' },
			{
				path: 'request', loadChildren: './../features/request/request.module#RequestModule'
			},
		]
	},
	{ path: '**', redirectTo: '' }
];

