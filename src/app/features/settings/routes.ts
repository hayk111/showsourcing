import { Routes } from '@angular/router';
import { SettingsComponent } from '~features/settings/containers/settings/settings.component';
import { SettingsProfileComponent } from '~features/settings/components/settings-profile/settings-profile.component';

export const routes: Routes = [
	{
		path: '',
		component: SettingsComponent,
		children: [
			{ path: 'profile', component: SettingsProfileComponent },
			{ path: '', component: SettingsProfileComponent }
		]
	}
];
