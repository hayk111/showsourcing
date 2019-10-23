import { Routes } from '@angular/router';
import {
	CategoryDataManagementPageComponent,
	DataManagementPageComponent,
	SupplierDataManagementPageComponent,
	EventDataManagementPageComponent,
	TagDataManagementPageComponent,
} from '~features/data-management';


import {
	SettingsPageComponent,
} from './pages/settings-page.component';

import * as CompanyPages from './pages/company';
import * as ProfilePages from './pages/profile';
import * as TeamPages from './pages/team';
import * as ExportsPages from './pages/exports';
import * as WorkflowPages from './pages/workflow';



export const routes: Routes = [
	{
		path: '',
		component: SettingsPageComponent,
		children: [
			{ path: '', redirectTo: 'profile', pathMatch: 'full' },
			{ path: 'profile', component: ProfilePages.ProfilePageComponent },
			{
				path: 'company', component: CompanyPages.CompanyPageComponent, children: [
					{ path: '', redirectTo: 'settings', pathMatch: 'full' },
					{ path: 'settings', component: CompanyPages.InfoPageComponent },
					{ path: 'teams', component:  CompanyPages.TeamsPageComponent },
					{ path: 'users', component:  CompanyPages.UsersPageComponent }
				]
			},
			{
				path: 'team', component: TeamPages.TeamPageComponent, children: [
					{ path: '', redirectTo: 'members', pathMatch: 'full' },
					{ path: 'members', component:  TeamPages.MembersPageComponent },
					{ path: 'info', component:  TeamPages.InfoPageComponent }
				]
			},
			{
				path: 'workflow', component: WorkflowPages.WorkflowPageComponent, children: [
					{ path: '', redirectTo: 'product', pathMatch: 'full' },
					{ path: 'product-status', component: WorkflowPages.ProductStatusPageComponent },
					{ path: 'supplier-status', component: WorkflowPages.SupplierStatusPageComponent },
					{ path: 'sample-status', component: WorkflowPages.SampleStatusPageComponent }
				]
			},
			{
				path: 'data', component: DataManagementPageComponent, children: [
					{ path: '', redirectTo: 'category', pathMatch: 'full' },
					{ path: 'category', component: CategoryDataManagementPageComponent },
					{ path: 'tag', component: TagDataManagementPageComponent },
					{ path: 'supplier', component: SupplierDataManagementPageComponent },
					{ path: 'event', component: EventDataManagementPageComponent }
				]
			},
			{ path: 'exports', component: ExportsPages.ExportsPageComponent }
		]
	}
];
