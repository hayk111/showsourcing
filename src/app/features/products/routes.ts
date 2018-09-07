import { Route } from '@angular/router';

import { ProductDetailsComponent, ProductGeneralInfoComponent, ProductsPageComponent } from '~features/products/containers';
import { ProductActivityComponent } from '~features/products/components/product-activity/product-activity.component';
import { ProductTasksComponent } from '~features/products/containers/product-tasks/product-tasks.component';

export const routes: Array<Route> = [
	{ path: '', redirectTo: 'all', pathMatch: 'full' },
	{
		path: 'all',
		component: ProductsPageComponent,
	},
	{
		path: 'details/:id',
		component: ProductDetailsComponent,
		children: [
			{ path: 'general', component: ProductGeneralInfoComponent },
			{ path: 'activity', component: ProductActivityComponent },
			{ path: 'tasks', component: ProductTasksComponent },
			{ path: '', redirectTo: 'general', pathMatch: 'full' }
		],
	},
];
