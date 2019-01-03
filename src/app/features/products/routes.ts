import { Route } from '@angular/router';

import {
	ProductDetailsComponent,
	ProductsPageComponent,
	ProductQuotationComponent,
	ProductSamplesComponent,
	ProductShippingComponent
} from '~features/products/containers';
import { ProductActivityComponent } from '~features/products/components/product-activity/product-activity.component';
import { ProductTasksComponent } from '~features/products/containers/product-tasks/product-tasks.component';

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
