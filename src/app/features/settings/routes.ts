import { Routes } from '@angular/router';
import {
	SettingsComponent, SettingsTeamMembersPageComponent
} from '~features/settings/containers';
import { SettingsProfileComponent } from '~features/settings/components';
import { DataManagementPageComponent } from '~features/data-management/containers';
// tslint:disable-next-line:max-line-length
import { CategoryDataManagementPageComponent } from '~features/data-management/containers/category-data-management-page/category-data-management-page.component';
import { ERM } from '~models';
// tslint:disable-next-line:max-line-length
import { TagDataManagementPageComponent } from '~features/data-management/containers/tag-data-management-page/tag-data-management-page.component';
// tslint:disable-next-line:max-line-length
import { EventDataManagementPageComponent } from '~features/data-management/containers/event-data-management-page/event-data-management-page.component';

export const routes: Routes = [
	{
		path: '',
		component: SettingsComponent,
		children: [
			{ path: '', redirectTo: 'profile', pathMatch: 'full' },
			{ path: 'profile', component: SettingsProfileComponent },
			{ path: 'team/members', component: SettingsTeamMembersPageComponent },
			{
				path: 'data', component: DataManagementPageComponent, children: [
					{ path: '', redirectTo: ERM.CATEGORY.url, pathMatch: 'full' },
					{ path: ERM.CATEGORY.url, component: CategoryDataManagementPageComponent },
					{ path: ERM.SUPPLIER_TAG.url, component: TagDataManagementPageComponent },
					{ path: ERM.PRODUCT_TAG.url, component: TagDataManagementPageComponent },
					{ path: ERM.EVENT.url, component: EventDataManagementPageComponent }
				]
			},
		]
	}
];
