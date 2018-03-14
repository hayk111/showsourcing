import { AuthGuardService } from '~features/auth';
import { components } from './../../shared/inputs/inputs.module';
import { Route } from '@angular/router';
import { CommentCtnrComponent } from '~features/comment/containers/comment-ctnr/comment-ctnr.component';
import { SupplierDetailsComponent, SuppliersPageComponent } from '~suppliers/containers';

export const routes: Array<Route> = [
	{
		path: 'suppliers',
		canActivate: [AuthGuardService],
		canActivateChild: [AuthGuardService],
		children: [
			{ path: '', redirectTo: 'all', pathMatch: 'full' },
			{ path: 'all', component: SuppliersPageComponent },
			{
				path: 'details/:id',
				component: SupplierDetailsComponent,
				children: [
					{ path: 'activity', component: CommentCtnrComponent },
					// { path: 'tasks', component: ProductTasksComponent },
					// { path: 'files', component: ProductFilesComponent },
				],
			},
		],
	},
];
