import { Route } from '@angular/router';
import { SupplierDetailsComponent, SuppliersPageComponent } from '~features/supplier/containers';

export const routes: Array<Route> = [
	{ path: '', redirectTo: 'all', pathMatch: 'full' },
	{ path: 'all', component: SuppliersPageComponent },
	{
		path: 'details/:id',
		component: SupplierDetailsComponent,
	},
];
