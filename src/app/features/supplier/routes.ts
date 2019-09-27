import { Route } from '@angular/router';
import {
	SupplierDetailsComponent,
	SupplierProductsPageComponent,
	SuppliersPageComponent,
	SupplierActivityComponent,
 	// SupplierProductsComponent,
 	// SupplierTasksComponent,
	// SupplierSamplesComponent
} from './pages';

export const routes: Array<Route> = [
	{
		path: '',
		component: SuppliersPageComponent
	},
	{
		path: ':id',
		component: SupplierDetailsComponent,
		children: [
			{ path: 'activity', component: SupplierActivityComponent },
			// { path: 'products', component: SupplierProductsComponent },
			// { path: 'samples', component: SupplierSamplesComponent },
			// { path: 'tasks', component: SupplierTasksComponent },
			{ path: '', redirectTo: 'activity', pathMatch: 'full' }
		]
	},
	// {
	// 	path: 'all-products/:id',
	// 	component: SupplierProductsPageComponent
	// }
];
