import { Routes } from '@angular/router';
import {
	CategoryDataManagementPageComponent,
	DataManagementPageComponent,
	SupplierDataManagementPageComponent,
	EventDataManagementPageComponent,
	TagDataManagementPageComponent,
} from '~features/data-management';

import {
	ProductStatusWorkflowComponent,
	SampleStatusWorkflowComponent,
	SettingsProfileComponent,
	SupplierStatusWorkflowComponent,
} from './components';
import {
	SettingsComponent,
	SettingsTeamMembersContentComponent,
	SettingsExportComponent,
	SettingsFieldsPageComponent,
	SettingsTeamMembersPageComponent,
	SettingsWorkflowsPageComponent,
} from './containers';


export const routes: Routes = [
	{
		path: '',
		component: SettingsComponent,
		children: [
			{ path: '', redirectTo: 'profile', pathMatch: 'full' },
			{ path: 'profile', component: SettingsProfileComponent },
			{ path: 'fields', component: SettingsFieldsPageComponent },
			{
				path: 'workflow', component: SettingsWorkflowsPageComponent, children: [
					{ path: '', redirectTo: 'product', pathMatch: 'full' },
					{ path: 'product', component: ProductStatusWorkflowComponent },
					{ path: 'supplier', component: SupplierStatusWorkflowComponent },
					{ path: 'sample', component: SampleStatusWorkflowComponent }
				]
			},
			{
				path: 'team', component: SettingsTeamMembersPageComponent, children: [
					{ path: '', redirectTo: 'members', pathMatch: 'full' },
					{ path: 'members', component:  SettingsTeamMembersContentComponent },
					{ path: 'settings', component:  SettingsTeamMembersContentComponent }
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
			{ path: 'exports', component: SettingsExportComponent }
		]
	}
];
