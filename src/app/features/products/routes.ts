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
			{ path: 'activity', component: DetailsPage.ProductActivityPageComponent },
			{ path: 'info', component: DetailsPage.ProductInfoPageComponent },
			{ path: 'files', component: DetailsPage.ProductFilesPageComponent },
			// { path: 'samples', component: ProductSamplesComponent },
			// { path: 'tasks', component: ProductTasksComponent },
			// { path: 'requests', component: ProductRequestsComponent }
		],
	},
];
