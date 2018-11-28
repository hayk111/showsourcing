import { Route } from '@angular/router';
import { AuthGuardService } from '~core/auth';
import { DataManagementPageComponent } from '~features/data-management/containers';

export const routes: Array<Route> = [
	// this router is not used, the one used is on settings > router
	{
		path: 'data-management',
		component: DataManagementPageComponent,
	},
];
