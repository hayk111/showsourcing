import { Route } from '@angular/router';
import { AuthGuardService } from '~features/auth';
import { DataManagementPageComponent } from '~features/data-management/containers';

export const routes: Array<Route> = [
	{
		path: 'data-management',
		component: DataManagementPageComponent,
	},
];
