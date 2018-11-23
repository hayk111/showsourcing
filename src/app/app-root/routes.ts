import { Route } from '@angular/router';
import { AuthGuardService } from '~features/auth';
import { routes as authRoutes } from '~features/auth/routes';
import { HasUserGuard } from '~features/auth/services/has-user.guard';
import { UnauthGuardService } from '~features/auth/services/unauth-guard.service';
import { routes as invitationRoutes } from '~features/invitation/routes';
import { CreateACompanyPageComponent } from '~features/pick-a-team/containers/create-a-company-page/create-a-company-page.component';
import { CreateATeamPageComponent } from '~features/pick-a-team/containers/create-a-team-page/create-a-team-page.component';
import { PickATeamPageComponent } from '~features/pick-a-team/containers/pick-a-team-page/pick-a-team-page.component';
import { HasCompanyGuard } from '~features/pick-a-team/services/has-company.guard';
import { HasTeamSelectedGuard } from '~features/pick-a-team/services/has-team-selected.guard';
import { HasTeamGuard } from '~features/pick-a-team/services/has-team.guard';
import { routes as testRoutes } from '~features/test-page/routes';
import { ApolloIssuePageComponent } from '~shared/apollo/components/apollo-issue-page/apollo-issue-page.component';
import {
	TeamClientReadyGuard,
	UserClientReadyGuard
} from '~shared/apollo/guards/client-ready.guard.service';
import {
	GuestTemplateComponent,
	RfqTemplateComponent,
	TemplateComponent
} from '~shared/template';

export const routes: Array<Route> = [
	{
		path: 'guest',
		component: GuestTemplateComponent,
		canActivateChild: [UnauthGuardService],
		loadChildren: 'app/features/auth/auth.module#AuthModule'
	},
	{
		path: 'issues',
		component: GuestTemplateComponent,
		children: [{ path: 'server-issues', component: ApolloIssuePageComponent }]
	},
	{
		path: 'user',
		component: GuestTemplateComponent,
		canActivateChild: [AuthGuardService, UserClientReadyGuard],
		loadChildren: 'app/features/pick-a-team/pick-a-team.module#PickATeamModule'
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
				path: 'task',
				loadChildren: 'app/features/tasks/tasks.module#TasksModule'
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
				path: 'test',
				loadChildren: 'app/features/test-page/test-page.module#TestPageModule'
			}
		]
	},
	{ path: '**', redirectTo: '' }
];
