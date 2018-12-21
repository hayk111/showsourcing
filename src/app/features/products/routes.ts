import { Route } from '@angular/router';

import {
	ProductDetailsComponent,
	ProductGeneralInfoComponent,
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
		children: [
			{ path: '', redirectTo: 'shipping', pathMatch: 'full' },
			{ path: 'general', component: ProductGeneralInfoComponent },
			{ path: 'shipping', component: ProductShippingComponent },
			{ path: 'activity', component: ProductActivityComponent },
			{ path: 'samples', component: ProductSamplesComponent },
			{ path: 'quotation', component: ProductQuotationComponent },
			{ path: 'tasks', component: ProductTasksComponent }
		],
	},
];
