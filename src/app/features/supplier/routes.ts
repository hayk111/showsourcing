import { Route } from '@angular/router';
import { SupplierDetailsComponent, SuppliersPageComponent } from '~features/supplier/containers';
import { SupplierActivityComponent } from '~features/supplier/containers/supplier-activity/supplier-activity.component';
import { SupplierPublicProfileComponent } from '~features/supplier/containers/supplier-public-profile/supplier-public-profile.component';
import { SupplierProductsComponent } from '~features/supplier/containers/supplier-products/supplier-products.component';
import { SupplierTasksComponent } from '~features/supplier/containers/supplier-tasks/supplier-tasks.component';
import { SupplierSamplesComponent } from './containers/supplier-samples/supplier-samples.component';
import { SupplierGeneralInfoComponent } from './containers/supplier-general-info/supplier-general-info.component';

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
			{ path: 'samples', component: SupplierSamplesComponent },
			{ path: 'tasks', component: SupplierTasksComponent },
			{ path: '', redirectTo: 'tasks', pathMatch: 'full' }
		]
	}
];
