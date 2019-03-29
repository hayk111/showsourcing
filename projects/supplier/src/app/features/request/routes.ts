import { Routes } from '@angular/router';
import { RequestsPageComponent, RequestDetailsComponent } from './containers';


export const routes: Routes = [
	{ path: '', redirectTo: 'all', pathMatch: 'full' },
	{
		path: 'all',
		component: RequestsPageComponent
	},
	{
		path: 'details/:id',
		component: RequestDetailsComponent
	},
];
