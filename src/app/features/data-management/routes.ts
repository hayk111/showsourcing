import { Route } from '@angular/router';
import { AuthGuardService } from '~app/features/auth';
import { DataManagementPageComponent } from '~app/features/data-management/containers';

export const routes: Array<Route> = [
	{
		path: 'data-management',
		component: DataManagementPageComponent,
	},
];
