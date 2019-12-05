import { Route } from '@angular/router';
import { TeamClientReadyGuard, UserClientReadyGuard } from '~core/apollo/guards/client-ready.guard.service';
import { AuthenticatedGuard } from '~core/auth';
import { HasUserGuard } from '~core/auth/services/has-user.guard';
import { GuestTemplateComponent, TemplateComponent } from '~core/template';
import { HasTeamSelectedGuard } from '~features/pick-a-team/services/has-team-selected.guard';
import { InvitationGuard } from '~features/pick-a-team/services/invitation.guard';
import { DevModeGuard } from '~utils/dev-mode.guard';

export const routes: Array<Route> = [
	{
		path: 'auth',
		component: GuestTemplateComponent,
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
		canActivateChild: [AuthenticatedGuard, UserClientReadyGuard],
		loadChildren: 'app/features/pick-a-team/pick-a-team.module#PickATeamModule',
		data: { showLogout: true }
	},
	{
		path: 'invitation',
		component: GuestTemplateComponent,
		canActivateChild: [InvitationGuard],
		loadChildren: 'app/features/invitation/invitation.module#InvitationModule',
		data: { showLogout: true }
	},
	{
		path: '',
		component: TemplateComponent,
		canActivateChild: [
			AuthenticatedGuard,
			UserClientReadyGuard,
			HasUserGuard,
			TeamClientReadyGuard,
			HasTeamSelectedGuard,
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
				path: 'request',
				loadChildren: 'app/features/requests/request.module#RequestModule'
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

