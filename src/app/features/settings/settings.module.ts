import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataManagementModule } from '~features/data-management/data-management.module';
import {
	InvitationsListViewComponent,
	SettingsProfileComponent,
	TeamMembersListViewComponent,
	ProductStatusWorkflowComponent,
	CompanyProfileCardComponent,
	ProfileCardComponent,
	SupplierStatusWorkflowComponent,
	SampleStatusWorkflowComponent,
} from '~features/settings/components';
import {
	SettingsComponent,
	SettingsFieldsPageComponent,
	SettingsTeamMembersInvitationsComponent,
	SettingsTeamMembersPageComponent,
	SettingsTeamMembersUsersComponent,
	SettingsWorkflowsPageComponent,
} from '~features/settings/containers';
import { routes } from '~features/settings/routes';
import { SharedModule } from '~shared/shared.module';

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		DataManagementModule,
	],
	declarations: [
		CompanyProfileCardComponent,
		InvitationsListViewComponent,
		ProductStatusWorkflowComponent,
		ProfileCardComponent,
		SampleStatusWorkflowComponent,
		SettingsComponent,
		SettingsFieldsPageComponent,
		SettingsProfileComponent,
		SettingsTeamMembersInvitationsComponent,
		SettingsTeamMembersPageComponent,
		SettingsTeamMembersUsersComponent,
		SettingsWorkflowsPageComponent,
		SupplierStatusWorkflowComponent,
		TeamMembersListViewComponent,
	],
	entryComponents: [],
	exports: [],
	providers: []
})
export class SettingsModule {


}
