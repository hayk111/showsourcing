import { Routes } from '@angular/router';
import {
	SettingsComponent, SettingsTeamMembersPageComponent
} from '~features/settings/containers';
import { SettingsProfileComponent } from '~features/settings/components';
import { DataManagementPageComponent } from '~features/data-management/containers';

export const routes: Routes = [
	{
		path: '',
		component: SettingsComponent,
		children: [
			{ path: 'profile', component: SettingsProfileComponent },
			{ path: 'team/members', component: SettingsTeamMembersPageComponent },
			{ path: 'data-management', component: DataManagementPageComponent },
			{ path: '', component: SettingsProfileComponent }
		]
	}
];
