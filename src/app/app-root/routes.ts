import { Route } from '@angular/router';
import { ClientReadyGuard } from '~core/api-lib';
import { AuthenticatedGuard } from '~core/auth/guards';
import { HasCompanyGuard, HasTeamGuard, HasTeamSelectedGuard } from '~features/auth/services';
import { GuestTemplateComponent, TemplateComponent } from '~shared/template/components';
import { DevModeGuard } from '~utils/dev-mode.guard';

export const routes: Array<Route> = [
	{
		path: 'auth',
		component: GuestTemplateComponent,
		loadChildren: 'app/features/auth/auth-feature.module#AuthFeatureModule'
	},
	// {
	// 	path: 'error',
	// 	component: GuestTemplateComponent,
	// 	loadChildren: 'app/features/error/error-feature.module#ErrorFeatureModule'
	// },
	// {
	// 	path: 'invitation',
	// 	component: GuestTemplateComponent,
	// 	canActivateChild: [InvitationGuard],
	// 	loadChildren: 'app/features/invitation/invitation-feature.module#InvitationFeatureModule',
	// },
	{
		path: 'dev',
		component: TemplateComponent,
		canLoad: [DevModeGuard],
		canActivate: [DevModeGuard],
		canActivateChild: [DevModeGuard],
		loadChildren: 'app/features/dev/dev-feature.module#DevFeatureModule'
	},
	{
		path: '',
		component: TemplateComponent,
		canActivate: [
			AuthenticatedGuard,
			ClientReadyGuard,
			HasCompanyGuard,
			HasTeamGuard,
			HasTeamSelectedGuard,
			// HasUserGuard,
		],
		children: [
			{ path: '', redirectTo: 'products', pathMatch: 'full', canActivate: [] },
	// 		{
	// 			path: 'dashboard',
	// 			loadChildren: 'app/features/dashboard/dashboard-feature.module#DashboardFeatureModule'
	// 		},
			// {
			// 	path: 'projects',
			// 	loadChildren: 'app/features/projects/projects-feature.module#ProjectsFeatureModule',
			// 	canActivate: [ClientReadyGuard]
			// },
			{
				path: 'products',
				loadChildren: 'app/features/products/products-feature.module#ProductsFeatureModule',
				canActivate: []
			},
			// {
			// 	path: 'requests',
			// 	loadChildren: 'app/features/requests/requests-feature.module#RequestsFeatureModule'
			// },
			// {
			// 	path: 'samples',
			// 	loadChildren: 'app/features/samples/samples-feature.module#SamplesFeatureModule',
			// 	canActivate: [ClientReadyGuard]
			// },
			{
				path: 'suppliers',
				loadChildren: 'app/features/suppliers/suppliers-feature.module#SuppliersFeatureModule',
				canActivate: []
			},
			// {
			// 	path: 'settings',
			// 	loadChildren: 'app/features/settings/settings-feature.module#SettingsFeatureModule',
			// 	canActivate: [ClientReadyGuard]
			// },
			// {
			// 	path: 'tasks',
			// 	loadChildren: 'app/features/tasks/tasks-feature.module#TasksFeatureModule',
			// 	canActivate: [ClientReadyGuard]
			// }
		]
	},
	{ path: '**', redirectTo: '' }
];

