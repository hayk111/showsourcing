import { AuthGuardService } from '~features/auth';
import { components } from './../../shared/inputs/inputs.module';
import { Route } from '@angular/router';
import { CommentCtnrComponent } from '~features/comment';
import { SupplierDetailsComponent, SuppliersPageComponent } from '~features/supplier/containers';

export const routes: Array<Route> = [
	{ path: '', redirectTo: 'all', pathMatch: 'full' },
	{ path: 'all', component: SuppliersPageComponent },
	{
		path: 'details/:id',
		component: SupplierDetailsComponent,
	},
];
