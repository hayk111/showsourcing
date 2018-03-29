import { Route } from '@angular/router';
import { TemplateComponent } from '~app/shared/template';
import { GuestTemplateComponent } from '~app/shared/template/components/guest-template/guest-template.component';
import { AuthGuardService } from '~auth';

import { HomeComponent } from './components/home/home.component';

export const routes: Array<Route> = [
	{ path: 'guest', component: GuestTemplateComponent },
	{
		path: '',
		component: TemplateComponent,
		canActivate: [AuthGuardService],
		canActivateChild: [AuthGuardService],
		children: [
			{ path: '', redirectTo: '/home', pathMatch: 'full', },
			{ path: 'home', component: HomeComponent },
			{ path: 'project', loadChildren: 'app/features/projects/projects.module#ProjectsModule' }
		],
	},
	{ path: '**', redirectTo: '' },
];
