import { Route } from '@angular/router';

import * as DetailsPage from './pages/supplier-details';
import * as TablePage from './pages/suppliers';


export const routes: Array<Route> = [
	{
		path: '',
		component: TablePage.SuppliersPageComponent
	},
	{
		path: ':id',
		component: DetailsPage.SupplierDetailsPageComponent,
		children: [
			{ path: '', redirectTo: 'activity', pathMatch: 'full' },
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
