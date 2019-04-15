import { Routes } from '@angular/router';
import { RequestsPageComponent, RequestDetailsComponent, RequestElementDetailsComponent } from './containers';


export const routes: Routes = [
	{ path: '', redirectTo: 'all', pathMatch: 'full' },
	{
		path: 'all',
		component: RequestsPageComponent
	},
	{
		path: ':id',
		component: RequestDetailsComponent
	},
	{
		path: '/request-element/:id',
		component: RequestElementDetailsComponent
	},
];
