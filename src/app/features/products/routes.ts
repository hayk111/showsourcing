import { Route } from '@angular/router';

import * as DetailsPage from './pages/product-details';
import * as TablePage from './pages/products';


export const routes: Array<Route> = [
	{
		path: '',
		component: TablePage.ProductsPageComponent
	},
	{
		path: ':id',
		component: DetailsPage.ProductDetailsPageComponent,
		children: [
			{ path: '', redirectTo: 'activity', pathMatch: 'full' },
			{ path: 'activity', component: DetailsPage.ActivityPageComponent },
			{ path: 'info', component: DetailsPage.InfoPageComponent },
			{ path: 'files', component: DetailsPage.FilesPageComponent },
			{ path: 'samples', component: DetailsPage.SamplesPageComponent },
			{ path: 'tasks', component: DetailsPage.TasksPageComponent },
			{ path: 'requests', component: DetailsPage.RequestsPageComponent }
		],
	},
];
