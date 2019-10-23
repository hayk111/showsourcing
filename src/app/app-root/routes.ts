import { Route } from '@angular/router';
import { TeamClientReadyGuard, CentralClientReadyGuard } from '~core/apollo/guards/client-ready.guard.service';
import { AuthenticatedGuard } from '~core/auth';
import { HasUserGuard } from '~core/auth/services/has-user.guard';
import { GuestTemplateComponent, TemplateComponent } from '~core/template';
import { HasTeamSelectedGuard } from '~features/auth/services/has-team-selected.guard';
import { InvitationGuard } from '~features/invitation/services/invitation.guard';
import { DevModeGuard } from '~utils/dev-mode.guard';

export const routes: Array<Route> = [
	{
		path: 'auth',
		component: GuestTemplateComponent,
		loadChildren: 'app/features/auth/auth-feature.module#AuthFeatureModule'
	},
	{
		path: 'error',
		component: GuestTemplateComponent,
		loadChildren: 'app/features/error/error-feature.module#ErrorFeatureModule'
	},
	{
		path: 'invitation',
		component: GuestTemplateComponent,
		canActivateChild: [InvitationGuard],
		loadChildren: 'app/features/invitation/invitation-feature.module#InvitationFeatureModule',
	},
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
		canActivateChild: [
			AuthenticatedGuard,
			CentralClientReadyGuard,
			HasTeamSelectedGuard,
			TeamClientReadyGuard,
			HasUserGuard
		],
		children: [
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
			{
				path: 'dashboard',
				loadChildren: 'app/features/dashboard/dashboard-feature.module#DashboardFeatureModule'
			},
			{
				path: 'projects',
				loadChildren: 'app/features/projects/projects-feature.module#ProjectsFeatureModule'
			},
			{
				path: 'products',
				loadChildren: 'app/features/products/products-feature.module#ProductsFeatureModule'
			},
			{
				path: 'requests',
				loadChildren: 'app/features/requests/requests-feature.module#RequestsFeatureModule'
			},
			{
				path: 'samples',
				loadChildren: 'app/features/samples/samples-feature.module#SamplesFeatureModule'
			},
			{
				path: 'suppliers',
				loadChildren: 'app/features/suppliers/suppliers-feature.module#SuppliersFeatureModule'
			},
			{
				path: 'settings',
				loadChildren: 'app/features/settings/settings-feature.module#SettingsFeatureModule'
			},
			{
				path: 'tasks',
				loadChildren: 'app/features/tasks/tasks-feature.module#TasksFeatureModule'
			}
		]
	},
	{ path: '**', redirectTo: '' }
];

