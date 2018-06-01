import { Route } from '@angular/router';
import { TemplateComponent } from '~shared/template';
import { GuestTemplateComponent } from '~shared/template/components/guest-template/guest-template.component';
import { AuthGuardService } from '~features/auth';

import { HomeComponent } from './components/home/home.component';
import { routes as authRoutes } from '~features/auth/routes';
import { routes as projectRoutes } from '~features/project/routes';
import { routes as dataManagementRoutes } from '~features/data-management/routes';
import { routes as supplierRoutes } from '~features/supplier/routes';
import { routes as taskRoutes } from '~features/tasks/router';
import { routes as productRoutes } from '~features/products/routes';
import { routes as userRoutes } from '~features/user/routes';
import { routes as testRoutes } from '~features/test-page/routes';
import { DataManagementPageComponent } from '~features/data-management/containers';
import { PickATeamPageComponent } from '~features/pick-a-team/containers/pick-a-team-page/pick-a-team-page.component';

export const routes: Array<Route> = [
	{
		path: 'guest', component: GuestTemplateComponent, children: [
			...authRoutes
		]
	},
	{
		path: '',
		component: TemplateComponent,
		canActivateChild: [AuthGuardService],
		children: [
			{ path: '', redirectTo: 'home', pathMatch: 'full', },
			{ path: 'home', component: HomeComponent },
			{
				path: 'project',
				children: projectRoutes,
				// loadChildren: 'app/features/project/project.module#ProjectsModule'
			},
			{ path: 'task', children: taskRoutes },
			{ path: 'product', children: productRoutes },
			{ path: 'supplier', children: supplierRoutes },
			{ path: 'data-management', component: DataManagementPageComponent },
			{ path: 'user', children: userRoutes },
			{ path: 'test', children: testRoutes },
			{ path: 'pick-a-team', component: PickATeamPageComponent }
		],
	},
	{ path: '**', redirectTo: '' },
];
