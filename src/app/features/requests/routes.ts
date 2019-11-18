import { Routes } from '@angular/router';


import * as Pages from './pages';


export const routes: Routes = [
	{
		path: '',
		component: Pages.RequestsPageComponent
	},
	{
		path: ':id',
		component: Pages.RequestDetailsPageComponent
	},
];
