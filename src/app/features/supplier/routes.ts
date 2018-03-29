import { AuthGuardService } from '~auth';
import { components } from './../../shared/inputs/inputs.module';
import { Route } from '@angular/router';
import { CommentCtnrComponent } from '~app/features/comment';
import { SupplierDetailsComponent, SuppliersPageComponent } from '~app/features/supplier/containers';

export const routes: Array<Route> = [
	{ path: '', redirectTo: 'all', pathMatch: 'full' },
	{ path: 'all', component: SuppliersPageComponent },
	{
		path: 'details/:id',
		component: SupplierDetailsComponent,
	},
];
