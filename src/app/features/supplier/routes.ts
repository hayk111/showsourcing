import { Route } from '@angular/router';
import {
	SupplierDetailsComponent,
	SupplierProductsPageComponent,
	SuppliersPageComponent,
	SupplierActivityComponent,
 	SupplierTasksComponent,
	SupplierSamplesComponent
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
			{ path: 'products', component: SupplierProductsPageComponent },
			{ path: 'samples', component: SupplierSamplesComponent },
			{ path: 'tasks', component: SupplierTasksComponent },
			{ path: '', redirectTo: 'activity', pathMatch: 'full' }
		]
	}
];
