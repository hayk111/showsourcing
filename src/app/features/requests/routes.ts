import { Routes } from '@angular/router';

import { RequestPageComponent } from './containers/request-page/request-page.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'all', pathMatch: 'full' },
	{
		path: 'all',
		component: RequestPageComponent
	},
	{
		path: 'details/:id',
		component: RequestPageComponent,
		data: { skipScrollTop: true },
	},
];
