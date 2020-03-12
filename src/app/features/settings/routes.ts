import { Routes } from '@angular/router';

import {
	SettingsPageComponent,
} from './pages/settings-page.component';

import * as CompanyPages from './pages/company';
import * as ProfilePages from './pages/profile';
import * as TeamPages from './pages/team';
import * as ExportsPages from './pages/exports';
import * as WorkflowPages from './pages/workflow';
import * as DataPages from './pages/list-management';



export const routes: Routes = [
	{
		path: '',
		component: SettingsPageComponent,
		children: [
			// { path: '', redirectTo: 'profile', pathMatch: 'full' },
			// { path: 'profile', component: ProfilePages.ProfilePageComponent },
			// {
			// 	path: 'company', component: CompanyPages.CompanyPageComponent, children: [
			// 		{ path: '', redirectTo: 'settings', pathMatch: 'full' },
			// 		{ path: 'settings', component: CompanyPages.InfoPageComponent },
			// 	]
			// },
			// {
			// 	path: 'team', component: TeamPages.TeamPageComponent, children: [
			// 		{ path: '', redirectTo: 'members', pathMatch: 'full' },
			// 		{ path: 'members', component:  TeamPages.MembersPageComponent },
			// 		{ path: 'settings', component:  TeamPages.SettingsPageComponent }
			// 	]
			// },
			// {
			// 	path: 'workflow', component: WorkflowPages.WorkflowPageComponent, children: [
			// 		{ path: '', redirectTo: 'product', pathMatch: 'full' },
			// 		{ path: 'product-status', component: WorkflowPages.ProductStatusPageComponent },
			// 		{ path: 'supplier-status', component: WorkflowPages.SupplierStatusPageComponent },
			// 		{ path: 'sample-status', component: WorkflowPages.SampleStatusPageComponent }
			// 	]
			// },
			{
				path: 'list-management', component: DataPages.ListManagementPageComponent, children: [
					{ path: '', redirectTo: 'category-data', pathMatch: 'full' },
					{ path: 'category-data', component: DataPages.CategoryDataPageComponent },
					{ path: 'tag-data', component: DataPages.TagDataPageComponent },
					{ path: 'supplier-data', component: DataPages.SupplierDataPageComponent },
					{ path: 'event-data', component: DataPages.EventDataPageComponent }
				]
			},
			// { path: 'exports', component: ExportsPages.ExportsPageComponent }
		]
	}
];
