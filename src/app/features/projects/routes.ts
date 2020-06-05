import { Route } from '@angular/router';

import * as DetailsPage from './pages/details';
import * as TablePage from './pages/projects';


export const routes: Array<Route> = [
	{ path: '', component: TablePage.ProjectsPageComponent },
	{
		path: ':id',
		component: DetailsPage.ProjectDetailsPageComponent,
		children: [
			{ path: 'products', component: DetailsPage.ProductsPageComponent },
			{ path: 'settings', component: DetailsPage.SettingsPageComponent },
			{ path: '', redirectTo: 'products', pathMatch: 'full' }
		],
	}
];

