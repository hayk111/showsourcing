import { Route } from '@angular/router';
import {
	ProductFilesComponent,
	ProductPageComponent,
	ProductsPageComponent,
	ProductTasksComponent,
} from '~products/features';

import { AccountCreatedComponent } from '../../features/auth/components/account-created/account-created.component';
import { AuthCardComponent } from '../../features/auth/components/auth-card/auth-card.component';
import { AuthGuardService } from '../../features/auth/services/auth-guard.service';
import { DataManagementPageComponent } from '../../features/data-management/components/data-management-page/data-management-page.component';
import { HomeComponent } from '../../features/home/components/home/home.component';
import { ProjectsPageComponent } from '../../projects/containers/projects-page/projects-page.component';
import { SupplierDetailsComponent } from '../../features/supplier-details-page/components/supplier-details/supplier-details.component';
import { SuppliersPageComponent } from '../../suppliers/containers/suppliers-page/suppliers-page.component';
import { TasksPageComponent } from '../../features/tasks-page/components/tasks-page/tasks-page.component';
import { TeamManagementPageComponent } from '../../features/team-management/components/team-management-page/team-management-page.component';
import { KanbanTestComponent } from '../../features/test/components/kanban-test/kanban-test.component';
import { TestInputsSelectorsComponent } from '../../features/test/components/test-inputs-selectors/test-inputs-selectors.component';
import { TestInputsVanillaComponent } from '../../features/test/components/test-inputs-vanilla/test-inputs-vanilla.component';
import { TestLoadesComponent } from '../../features/test/components/test-loades/test-loades.component';
import { TestProductComponent } from '../../features/test/components/test-product/test-product.component';
import { TestTabsComponent } from '../../features/test/components/test-tabs/test-tabs.component';
import { TestComponent } from '../../features/test/test/test.component';
import { WorkflowPageComponent } from '../../features/workflow/components/workflow-page/workflow-page.component';
import { CommentCtnrComponent } from '../../comment/containers/comment-ctnr/comment-ctnr.component';

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
						// children: [
						// 	{ path: 'activity', component: ProductActivityPageComponent },
						// 	{ path: 'sample', component: ProductSampleComponent },
						// 	{ path: 'technical-details', component: ProductTechDetailsComponent },
						// 	{ path: 'tasks', component: ProductTasksComponent },
						// 	{ path: 'files', component: ProductFilesComponent },
						// ],
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
