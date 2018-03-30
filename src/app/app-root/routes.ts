import { Route } from '@angular/router';
import { TemplateComponent } from '~app/shared/template';
import { GuestTemplateComponent } from '~app/shared/template/components/guest-template/guest-template.component';
import { AuthGuardService } from '~auth';

import { HomeComponent } from './components/home/home.component';
import { routes as authRoutes } from '~auth/routes';
import { routes as projectRoutes } from '~app/features/projects/routes';
import { routes as dataManagementRoutes } from '~app/features/data-management/routes';
import { routes as supplierRoutes } from '~app/features/supplier/routes';
import { routes as taskRoutes } from '~app/features/tasks/router';
import { routes as productRoutes } from '~app/features/products/routes';
import { DataManagementPageComponent } from '~app/features/data-management/containers';

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
				// loadChildren: 'app/features/projects/projects.module#ProjectsModule'
			},
			{ path: 'task', children: taskRoutes },
			{ path: 'product', children: productRoutes },
			{ path: 'supplier', children: supplierRoutes },
			{ path: 'data-management', component: DataManagementPageComponent }
		],
	},
	{ path: '**', redirectTo: '' },
];
