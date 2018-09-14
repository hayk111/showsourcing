import { Route } from '@angular/router';
import { AuthGuardService } from '~features/auth';
import { routes as authRoutes } from '~features/auth/routes';
import { UnauthGuardService } from '~features/auth/services/unauth-guard.service';
import { DataManagementPageComponent } from '~features/data-management/containers';
import { CreateATeamPageComponent } from '~features/pick-a-team/containers/create-a-team-page/create-a-team-page.component';
import { PickATeamPageComponent } from '~features/pick-a-team/containers/pick-a-team-page/pick-a-team-page.component';
import { HasTeamSelectedGuard } from '~features/pick-a-team/services/has-team-selected.guard';
import { HasTeamGuard } from '~features/pick-a-team/services/has-team.guard';
import { routes as productRoutes } from '~features/products/routes';
import { routes as projectRoutes } from '~features/project/routes';
import { routes as settingsRoutes } from '~features/settings/routes';
import { routes as supplierRoutes } from '~features/supplier/routes';
import { routes as taskRoutes } from '~features/tasks/router';
import { routes as invitationRoutes } from '~features/invitation/routes';
import { routes as testRoutes } from '~features/test-page/routes';
import { ApolloIssuePageComponent } from '~shared/apollo/components/apollo-issue-page/apollo-issue-page.component';
import { TemplateComponent, GuestTemplateComponent, RfqTemplateComponent } from '~shared/template';
import { UserClientReadyGuard, TeamClientReadyGuard } from '~shared/apollo/guards/client-ready.guard.service';
import { HasCompanyGuard } from '~features/pick-a-team/services/has-company.guard';
import { CreateACompanyPageComponent } from '~features/pick-a-team/containers/create-a-company-page/create-a-company-page.component';
import { HasCompanySelectGuard } from '~features/pick-a-team/services/has-company-selected.guard';

export const routes: Array<Route> = [
	{
		path: 'guest',
		component: GuestTemplateComponent,
		canActivateChild: [
			UnauthGuardService
		],
		children: [
			...authRoutes,
			{ path: 'server-issue', component: ApolloIssuePageComponent }
		]
	},
	{ path: 'server-issue', component: ApolloIssuePageComponent },
	{
		path: 'user',
		component: GuestTemplateComponent,
		canActivateChild: [
			AuthGuardService,
			UserClientReadyGuard
		],
		children: [
			{ path: 'create-a-team', component: CreateATeamPageComponent, canActivate: [HasCompanySelectGuard] },
			{ path: 'pick-a-team', component: PickATeamPageComponent, canActivate: [HasTeamGuard] },
			{ path: 'create-a-company', component: CreateACompanyPageComponent },
		]
	},
	{
		path: 'rfq/:token',
		component: RfqTemplateComponent,
		canActivateChild: [

		],
		children: [
			{ path: '', loadChildren: 'app/features/rfq/rfq.module#RfqModule' },
		],
	},
	{
		path: 'invitation',
		component: GuestTemplateComponent,
		canActivateChild: [
		],
		children: [
			...invitationRoutes
		]
	},
	{
		path: '',
		component: TemplateComponent,
		canActivateChild: [
			AuthGuardService,
			TeamClientReadyGuard
		],
		children: [
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full', },
			{ path: 'dashboard', loadChildren: 'app/features/dashboard/dashboard.module#DashboardModule' },
			{ path: 'project', loadChildren: 'app/features/project/project.module#ProjectModule' },
			{ path: 'task', loadChildren: 'app/features/tasks/tasks.module#TasksModule' },
			{ path: 'product', loadChildren: 'app/features/products/product.module#ProductModule' },
			{ path: 'supplier', loadChildren: 'app/features/supplier/supplier.module#SuppliersModule' },
			{ path: 'settings', loadChildren: 'app/features/settings/settings.module#SettingsModule' },
			{ path: 'shows', loadChildren: 'app/features/shows/shows.module#ShowsModule' },
			{ path: 'workspace', loadChildren: 'app/features/workspace/workspace.module#WorkspaceModule' },
			{ path: 'test', children: testRoutes }
		],
	},
	{ path: '**', redirectTo: '' },
];
