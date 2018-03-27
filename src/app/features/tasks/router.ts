import { AuthGuardService } from '~auth';
import { Route } from '@angular/router';
import { TasksPageComponent } from '~app/features/tasks';

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
