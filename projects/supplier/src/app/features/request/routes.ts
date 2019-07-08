import { Routes } from '@angular/router';

import { RequestDetailsComponent, RequestsPageComponent } from './containers';


export const routes: Routes = [
	{
		path: '',
		component: RequestsPageComponent
	},
	{
		path: ':id',
		component: RequestDetailsComponent
	}
];
