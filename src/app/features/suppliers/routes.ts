import { Route } from '@angular/router';
import {
	SupplierDetailsPageComponent,
	ProductsPageComponent,
	SuppliersPageComponent,
	ActivityPageComponent,
	SupplierTasksComponent,
	SupplierSamplesComponent,
	FilesPageComponent
} from './pages';

export const routes: Array<Route> = [
	{
		path: '',
		component: SuppliersPageComponent
	},
	{
		path: ':id',
		component: SupplierDetailsPageComponent,
		children: [
			{ path: 'activity', component: ActivityPageComponent },
			{ path: 'products', component: ProductsPageComponent },
			{ path: 'samples', component: SupplierSamplesComponent },
			{ path: 'tasks', component: SupplierTasksComponent },
			{ path: 'files', component: FilesPageComponent },
			{ path: '', redirectTo: 'activity', pathMatch: 'full' }
		]
	}
];
