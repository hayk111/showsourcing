import { Routes } from '@angular/router';
import {
	SettingsComponent, SettingsTeamMembersPageComponent
} from '~features/settings/containers';
import { SettingsProfileComponent } from '~features/settings/components';

export const routes: Routes = [
	{
		path: '',
		component: SettingsComponent,
		children: [
			{ path: 'profile', component: SettingsProfileComponent },
			{ path: 'team/members', component: SettingsTeamMembersPageComponent },
			{ path: '', component: SettingsProfileComponent }
		]
	}
];
