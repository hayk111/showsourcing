import { Route } from '@angular/router';
import { AuthCardComponent, AuthGuardService } from '~auth';
import { CommentCtnrComponent } from '~modules/comment/containers/comment-ctnr/comment-ctnr.component';
import { DataManagementPageComponent } from '~modules/data-management/containers';
import { HomeComponent } from '~app/components/home/home.component';
import { ProjectsPageComponent } from '~modules/projects/containers/projects-page/projects-page.component';
import { TeamManagementPageComponent } from '~modules/team-management/components';
import { WorkflowPageComponent } from '~modules/workflow/containers/workflow-page/workflow-page.component';
import {
	ProductFilesComponent,
	ProductPageComponent,
	ProductsPageComponent,
	ProductTasksComponent,
} from '~products/features';
import { SupplierDetailsComponent, SuppliersPageComponent } from '~suppliers';
import { TasksPageComponent } from '~tasks';

export const routes: Array<Route> = [
	{ path: 'login', component: AuthCardComponent },
	{
		path: '',
		canActivate: [AuthGuardService],
		canActivateChild: [AuthGuardService],
		children: [
			{ path: '', redirectTo: 'home', pathMatch: 'full' },
			{ path: 'home', component: HomeComponent },
			{
				path: 'products',
				children: [
					{ path: '', redirectTo: 'all', pathMatch: 'full' },
					{ path: 'all', component: ProductsPageComponent },
					{
						path: 'details/:id',
						component: ProductPageComponent,
						children: [
							{ path: 'activity', component: CommentCtnrComponent },
							{ path: 'tasks', component: ProductTasksComponent },
							{ path: 'files', component: ProductFilesComponent },
						],
					},
				],
			},
			{
				path: 'tasks',
				children: [
					{ path: '', redirectTo: 'all', pathMatch: 'full' },
					{ path: 'all', component: TasksPageComponent },
				],
			},
			{
				path: 'suppliers',
				children: [
					{ path: '', redirectTo: 'all', pathMatch: 'full' },
					{ path: 'all', component: SuppliersPageComponent },
					{
						path: 'details/:id',
						component: SupplierDetailsComponent,
						children: [
							{ path: 'activity', component: CommentCtnrComponent },
							// { path: 'tasks', component: ProductTasksComponent },
							// { path: 'files', component: ProductFilesComponent },
						],
					},
				],
			},
			{
				path: 'projects',
				children: [
					{ path: '', redirectTo: 'all', pathMatch: 'full' },
					{ path: 'all', component: ProjectsPageComponent },
				],
			},
			{ path: 'workflow', component: WorkflowPageComponent },
			{ path: 'data-management', component: DataManagementPageComponent },
			{ path: 'team-management', component: TeamManagementPageComponent },
			// {
			// 	path: 'test',
			// 	component: TestComponent,
			// 	children: [
			// 		{ path: 'inputs-vanilla', component: TestInputsVanillaComponent },
			// 		{ path: 'inputs-selector', component: TestInputsSelectorsComponent },
			// 		{ path: 'kanban', component: KanbanTestComponent },
			// 		{ path: 'loaders', component: TestLoadesComponent },
			// 		{ path: 'tabs', component: TestTabsComponent },
			// 		{ path: 'product', component: TestProductComponent },
			// 	],
			// },
		],
	},
	{ path: '**', redirectTo: '' },
];
