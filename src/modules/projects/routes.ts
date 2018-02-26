import { Route } from '@angular/router';
import { ProjectsPageComponent } from '~modules/projects/containers/projects-page/projects-page.component';

export const routes: Array<Route> = [
	{
		path: 'projects',
		children: [
			{ path: '', redirectTo: 'all', pathMatch: 'full' },
			{ path: 'all', component: ProjectsPageComponent },
		],
	},
];
