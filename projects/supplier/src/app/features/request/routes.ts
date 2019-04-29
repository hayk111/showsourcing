import { Routes } from '@angular/router';
import { RequestsPageComponent, RequestDetailsComponent, RequestElementDetailsComponent } from './containers';


export const routes: Routes = [
	{
		path: '',
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
