import { Route } from '@angular/router';

import {
	ProductDetailsPageComponent,
	ProductActivityComponent,
	ProductsPageComponent,
} from './pages';


export const routes: Array<Route> = [
	{
		path: '',
		component: ProductsPageComponent
	},
	{
		path: ':id',
		component: ProductDetailsPageComponent,
		children: [
			{ path: '', redirectTo: 'activity', pathMatch: 'full' },
			// { path: 'shipping', component: ProductShippingComponent },
			{ path: 'activity', component: ProductActivityComponent },
			// { path: 'samples', component: ProductSamplesComponent },
			// { path: 'tasks', component: ProductTasksComponent },
			// { path: 'requests', component: ProductRequestsComponent }
		],
	},
];
