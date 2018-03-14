import { AuthGuardService } from '~features/auth';
import { Route } from '@angular/router';
import { TasksPageComponent } from '~tasks/containers';

export const routes: Array<Route> = [
	{
		path: 'tasks',
		canActivate: [AuthGuardService],
		canActivateChild: [AuthGuardService],
		children: [
			{ path: '', redirectTo: 'all', pathMatch: 'full' },
			{ path: 'all', component: TasksPageComponent },
		],
	},
];
