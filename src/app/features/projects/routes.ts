import { Route } from '@angular/router';
import { AuthGuardService } from '~app/features/auth';
import { ProjectsPageComponent } from '~app/features/projects';

export const routes: Array<Route> = [
	{
		path: 'projects',
		canActivate: [AuthGuardService],
		canActivateChild: [AuthGuardService],
		children: [
			{ path: '', redirectTo: 'all', pathMatch: 'full' },
			{ path: 'all', component: ProjectsPageComponent },
		],
	},
];
