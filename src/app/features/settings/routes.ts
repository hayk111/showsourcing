import { Routes } from '@angular/router';
import { DataManagementPageComponent } from '~features/data-management/containers';
import {
	CategoryDataManagementPageComponent,
} from '~features/data-management/containers/category-data-management-page/category-data-management-page.component';
import {
	EventDataManagementPageComponent,
} from '~features/data-management/containers/event-data-management-page/event-data-management-page.component';
import {
	TagDataManagementPageComponent,
} from '~features/data-management/containers/tag-data-management-page/tag-data-management-page.component';
import { SettingsProfileComponent } from '~features/settings/components';
import {
	SettingsComponent,
	SettingsExportComponent,
	SettingsFieldsPageComponent,
	SettingsTeamMembersPageComponent,
	SettingsWorkflowsPageComponent,
} from '~features/settings/containers';

export const routes: Routes = [
	{
		path: '',
		component: SettingsComponent,
		children: [
			{ path: '', redirectTo: 'profile', pathMatch: 'full' },
			{ path: 'profile', component: SettingsProfileComponent },
			{ path: 'fields', component: SettingsFieldsPageComponent },
			{ path: 'workflows', component: SettingsWorkflowsPageComponent },
			{ path: 'team/members', component: SettingsTeamMembersPageComponent },
			{
				path: 'data', component: DataManagementPageComponent, children: [
					{ path: '', redirectTo: 'category', pathMatch: 'full' },
					{ path: 'category', component: CategoryDataManagementPageComponent },
					{ path: 'tag', component: TagDataManagementPageComponent },
					{ path: 'event', component: EventDataManagementPageComponent }
				]
			},
			{ path: 'exports', component: SettingsExportComponent }
		]
	}
];
