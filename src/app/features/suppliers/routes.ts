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
		component: Pages.DetailsPageComponent,
		children: [
			{ path: '', redirectTo: 'products', pathMatch: 'full' },
			{ path: 'activity', component: DetailsPage.ActivityPageComponent },
			{ path: 'products', component: DetailsPage.ProductsPageComponent },
			{ path: 'contacts', component: DetailsPage.ContactsPageComponent },
			{ path: 'samples', component: DetailsPage.SamplesPageComponent },
			{ path: 'tasks', component: DetailsPage.TasksPageComponent },
			{ path: 'files', component: DetailsPage.FilesPageComponent },
			// { path: 'requests', component: DetailsPage.RequestsPageComponent },
		]
	}
];
