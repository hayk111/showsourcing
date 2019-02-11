import { Routes } from '@angular/router';
import {
	SettingsComponent, SettingsTeamMembersPageComponent, SettingsFieldsPageComponent, SettingsWorkflowsPageComponent
} from '~features/settings/containers';
import { SettingsProfileComponent, SupplierStatusWorkflowComponent, SampleStatusWorkflowComponent } from '~features/settings/components';
import { DataManagementPageComponent } from '~features/data-management/containers';
// tslint:disable-next-line:max-line-length
import { CategoryDataManagementPageComponent } from '~features/data-management/containers/category-data-management-page/category-data-management-page.component';
import { ERM } from '~models';
// tslint:disable-next-line:max-line-length
import { TagDataManagementPageComponent } from '~features/data-management/containers/tag-data-management-page/tag-data-management-page.component';
// tslint:disable-next-line:max-line-length
import { EventDataManagementPageComponent } from '~features/data-management/containers/event-data-management-page/event-data-management-page.component';
import { ProductStatusWorkflowComponent } from './components/product-status-workflow/product-status-workflow.component';

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
			{ path: 'team/members', component: SettingsTeamMembersPageComponent },
			{
				path: 'data', component: DataManagementPageComponent, children: [
					{ path: '', redirectTo: 'category', pathMatch: 'full' },
					{ path: 'category', component: CategoryDataManagementPageComponent },
					{ path: 'tag', component: TagDataManagementPageComponent },
					{ path: 'event', component: EventDataManagementPageComponent }
				]
			},
		]
	}
];
