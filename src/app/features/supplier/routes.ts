import { Route } from '@angular/router';
import { SupplierDetailsComponent, SuppliersPageComponent } from '~features/supplier/containers';
import { SupplierActivityComponent } from '~features/supplier/containers/supplier-activity/supplier-activity.component';
import { SupplierPublicProfileComponent } from '~features/supplier/containers/supplier-public-profile/supplier-public-profile.component';
import { SupplierProductsComponent } from '~features/supplier/containers/supplier-products/supplier-products.component';
import { SupplierTasksComponent } from '~features/supplier/containers/supplier-tasks/supplier-tasks.component';

export const routes: Array<Route> = [
	{ path: '', redirectTo: 'all', pathMatch: 'full' },
	{
		path: 'all',
		component: SuppliersPageComponent
	},
	{
		path: 'details/:id',
		component: SupplierDetailsComponent,
		children: [
			{ path: 'activity', component: SupplierActivityComponent },
			{ path: 'public-profile', component: SupplierPublicProfileComponent },
			{ path: 'products', component: SupplierProductsComponent },
			{ path: 'tasks', component: SupplierTasksComponent },
			{ path: '', redirectTo: 'activity', pathMatch: 'full' }
		]
	}
];
