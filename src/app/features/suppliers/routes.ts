import { Route } from '@angular/router';

import * as Pages from './pages';
import * as DetailsPage from './pages/details';


export const routes: Array<Route> = [
	{
		path: '',
		redirectTo: 'table'
	},
	{
		path: 'table',
		component: Pages.TablePageComponent
	},
	{
		path: ':id',
		component: Pages.DetailsPageComponent
	}
];
