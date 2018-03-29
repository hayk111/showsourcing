import { Route } from '@angular/router';
import { AuthGuardService } from '~app/features/auth';
import { ProjectsPageComponent } from './containers/projects-page/projects-page.component';
import { TemplateComponent } from '~app/shared/template';

export const routes: Array<Route> = [
	{
		path: 'project',
		canActivate: [AuthGuardService],
		canLoad: [AuthGuardService],
		component: TemplateComponent,
		children: [
			{ path: '', redirectTo: 'all', pathMatch: 'full' },
			{ path: 'all', component: ProjectsPageComponent },
		],
	}
];

