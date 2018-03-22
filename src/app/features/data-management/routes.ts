import { Route } from '@angular/router';
import { DataManagementPageComponent } from '~features/data-management/containers';
import { AuthGuardService } from '~app/features/auth';

export const routes: Array<Route> = [
	{
		path: 'data-management',
		canActivate: [AuthGuardService],
		canActivateChild: [AuthGuardService],
		component: DataManagementPageComponent,
	},
];
