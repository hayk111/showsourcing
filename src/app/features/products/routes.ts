import { Route } from '@angular/router';

import { ProductActivityComponent } from './components';
import {
	ProductDetailsComponent,
	ProductQuotationComponent,
	ProductSamplesComponent,
	ProductShippingComponent,
	ProductsPageComponent,
	ProductTasksComponent,
} from './containers';


export const routes: Array<Route> = [
	{ path: '', redirectTo: 'all', pathMatch: 'full' },
	{
		path: 'all',
		component: ProductsPageComponent
	},
	{
		path: 'details/:id',
		component: ProductDetailsComponent,
		data: { skipScrollTop: true },
		children: [
			{ path: '', redirectTo: 'shipping', pathMatch: 'full', data: { skipScrollTop: true } },
			{ path: 'shipping', component: ProductShippingComponent, data: { skipScrollTop: true } },
			{ path: 'activity', component: ProductActivityComponent, data: { skipScrollTop: true } },
			{ path: 'samples', component: ProductSamplesComponent, data: { skipScrollTop: true } },
			{ path: 'quotation', component: ProductQuotationComponent, data: { skipScrollTop: true } },
			{ path: 'tasks', component: ProductTasksComponent, data: { skipScrollTop: true } }
		],
	},
];
