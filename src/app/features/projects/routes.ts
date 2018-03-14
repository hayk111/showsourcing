import { AuthGuardService } from '~features/auth';
import { Route } from '@angular/router';
import { ProjectsPageComponent } from '~features/projects/containers/projects-page/projects-page.component';

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
