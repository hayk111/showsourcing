import { Routes } from '@angular/router';

import { RequestDetailsComponent, RequestPageComponent } from './containers';

export const routes: Routes = [
	{
		path: '',
		component: RequestPageComponent
	},
	{
		path: ':id',
		component: RequestDetailsComponent
	},
];
