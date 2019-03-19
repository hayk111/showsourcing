import { Routes } from '@angular/router';

import { RequestDetailsComponent, RequestPageComponent } from './containers';

export const routes: Routes = [
	{ path: '', redirectTo: 'all', pathMatch: 'full' },
	{
		path: 'all',
		component: RequestPageComponent
	},
	{
		path: 'details/:id',
		component: RequestDetailsComponent
	},
];
