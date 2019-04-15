import { Route } from '@angular/router';

import { ProductActivityComponent } from './components';
import {
	ProductDetailsComponent,
	ProductSamplesComponent,
	ProductShippingComponent,
	ProductsPageComponent,
	ProductTasksComponent,
} from './containers';
import { ProductRequestsComponent } from './containers/product-requests/product-requests.component';


export const routes: Array<Route> = [
	{ path: '', redirectTo: 'all', pathMatch: 'full' },
	{
		path: 'all',
		component: ProductsPageComponent
	},
	{
		path: ':id',
		component: ProductDetailsComponent,
		children: [
			{ path: '', redirectTo: 'activity', pathMatch: 'full' },
			{ path: 'shipping', component: ProductShippingComponent },
			{ path: 'activity', component: ProductActivityComponent },
			{ path: 'samples', component: ProductSamplesComponent },
			{ path: 'tasks', component: ProductTasksComponent },
			{ path: 'requests', component: ProductRequestsComponent }
		],
	},
];
