import { Route } from '@angular/router';
import { CommentCtnrComponent } from '~modules/comment/containers/comment-ctnr/comment-ctnr.component';
import { AccountCreatedComponent } from '~modules/features/auth/components/account-created/account-created.component';
import { AuthCardComponent } from '~modules/features/auth/components/auth-card/auth-card.component';
import { AuthGuardService } from '~modules/features/auth/services/auth-guard.service';
import { DataManagementPageComponent } from '~modules/features/data-management/components/data-management-page/data-management-page.component';
import { HomeComponent } from '~modules/features/home/components/home/home.component';
import { TeamManagementPageComponent } from '~modules/features/team-management/components/team-management-page/team-management-page.component';
import { KanbanTestComponent } from '~modules/features/test/components/kanban-test/kanban-test.component';
import { TestInputsSelectorsComponent } from '~modules/features/test/components/test-inputs-selectors/test-inputs-selectors.component';
import { TestInputsVanillaComponent } from '~modules/features/test/components/test-inputs-vanilla/test-inputs-vanilla.component';
import { TestLoadesComponent } from '~modules/features/test/components/test-loades/test-loades.component';
import { TestProductComponent } from '~modules/features/test/components/test-product/test-product.component';
import { TestTabsComponent } from '~modules/features/test/components/test-tabs/test-tabs.component';
import { TestComponent } from '~modules/features/test/test/test.component';
import { WorkflowPageComponent } from '~modules/features/workflow/components/workflow-page/workflow-page.component';
import { ProjectsPageComponent } from '~modules/projects/containers/projects-page/projects-page.component';
import { SupplierDetailsComponent } from '~modules/suppliers/containers/supplier-details/supplier-details.component';
import { SuppliersPageComponent } from '~modules/suppliers/containers/suppliers-page/suppliers-page.component';
import { TasksPageComponent } from '~modules/tasks/containers/tasks-page/tasks-page.component';
import {
	ProductFilesComponent,
	ProductPageComponent,
	ProductsPageComponent,
	ProductTasksComponent,
} from '~products/features';

export const routes: Array<Route> = [
	{ path: 'login', component: AuthCardComponent },
	{ path: 'account-created', component: AccountCreatedComponent },
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
			{
				path: 'test',
				component: TestComponent,
				children: [
					{ path: 'inputs-vanilla', component: TestInputsVanillaComponent },
					{ path: 'inputs-selector', component: TestInputsSelectorsComponent },
					{ path: 'kanban', component: KanbanTestComponent },
					{ path: 'loaders', component: TestLoadesComponent },
					{ path: 'tabs', component: TestTabsComponent },
					{ path: 'product', component: TestProductComponent },
				],
			},
		],
	},
	{ path: '**', redirectTo: '' },
];
