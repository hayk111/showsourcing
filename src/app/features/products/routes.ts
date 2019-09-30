import { Route } from '@angular/router';

import {
	ProductDetailsPageComponent,
	ProductActivityComponent,
	ProductsPageComponent,
	ProductInfoComponent,
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
			{ path: 'activity', component: ProductActivityComponent },
			{ path: 'info', component: ProductInfoComponent },
			// { path: 'samples', component: ProductSamplesComponent },
			// { path: 'tasks', component: ProductTasksComponent },
			// { path: 'requests', component: ProductRequestsComponent }
		],
	},
];
