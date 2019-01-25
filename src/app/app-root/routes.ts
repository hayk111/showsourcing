import { Route } from '@angular/router';
import { TeamClientReadyGuard, UserClientReadyGuard } from '~core/apollo/guards/client-ready.guard.service';
import { AuthGuardService } from '~core/auth';
import { HasUserGuard } from '~core/auth/services/has-user.guard';
import { UnauthGuardService } from '~core/auth/services/unauth-guard.service';
import { GuestTemplateComponent, TemplateComponent } from '~core/template';
import { HasTeamSelectedGuard } from '~features/pick-a-team/services/has-team-selected.guard';
import { DevModeGuard } from '~utils/dev-mode.guard';

export const routes: Array<Route> = [
	{
		path: 'auth',
		component: GuestTemplateComponent,
		canActivateChild: [UnauthGuardService],
		loadChildren: 'app/features/auth-pages/auth-pages.module#AuthPagesModule'
	},
	{
		path: 'error',
		component: GuestTemplateComponent,
		loadChildren: 'app/features/error-pages/error-pages.module#ErrorPagesModule'
	},
	{
		path: 'user',
		component: GuestTemplateComponent,
		canActivateChild: [AuthGuardService, UserClientReadyGuard],
		loadChildren: 'app/features/pick-a-team/pick-a-team.module#PickATeamModule',
		data: { showLogout: true }
	},
	{
		path: 'invitation',
		component: GuestTemplateComponent,
		loadChildren: 'app/features/invitation/invitation.module#InvitationModule'
	},
	{
		path: '',
		component: TemplateComponent,
		canActivateChild: [
			AuthGuardService,
			UserClientReadyGuard,
			HasTeamSelectedGuard,
			TeamClientReadyGuard,
			HasUserGuard
		],
		children: [
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
			{
				path: 'dashboard',
				loadChildren: 'app/features/dashboard/dashboard.module#DashboardModule'
			},
			{
				path: 'project',
				loadChildren: 'app/features/project/project.module#ProjectModule'
			},
			{
				path: 'product',
				loadChildren: 'app/features/products/product.module#ProductModule'
			},
			{
				path: 'supplier',
				loadChildren: 'app/features/supplier/supplier.module#SuppliersModule'
			},
			{
				path: 'settings',
				loadChildren: 'app/features/settings/settings.module#SettingsModule'
			},
			{
				path: 'shows',
				loadChildren: 'app/features/shows/shows.module#ShowsModule'
			},
			{
				path: 'workspace',
				loadChildren: 'app/features/workspace/workspace.module#WorkspaceModule'
			},
			{
				path: 'component-library',
				canLoad: [DevModeGuard],
				loadChildren: 'app/features/component-library/component-library.module#ComponentLibraryModule'
			},
			{
				path: 'test',
				canLoad: [DevModeGuard],
				loadChildren: 'app/features/test-page/test-page.module#TestPageModule'
			}
		]
	},
	{ path: '**', redirectTo: '' }
];

