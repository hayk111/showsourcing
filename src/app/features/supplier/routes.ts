import { AuthGuardService } from '~auth';
import { components } from './../../shared/inputs/inputs.module';
import { Route } from '@angular/router';
import { CommentCtnrComponent } from '~app/features/comment';
import { SupplierDetailsComponent, SuppliersPageComponent } from '~app/features/supplier';

export const routes: Array<Route> = [
	{
		path: 'supplier',
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
