import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataManagementModule } from '~features/data-management/data-management.module';
import {
	InvitationsListViewComponent,
	SettingsExportComponent,
	SettingsProfileComponent,
	TeamMembersListViewComponent,
} from '~features/settings/components';
import {
	CompanyProfileCardComponent,
} from '~features/settings/components/company-profile-card/company-profile-card.component';
import { ProfileCardComponent } from '~features/settings/components/profile-card/profile-card.component';
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
		ProfileCardComponent,
		SettingsComponent,
		SettingsExportComponent,
		SettingsFieldsPageComponent,
		SettingsProfileComponent,
		SettingsTeamMembersInvitationsComponent,
		SettingsTeamMembersPageComponent,
		SettingsTeamMembersUsersComponent,
		SettingsWorkflowsPageComponent,
		TeamMembersListViewComponent,
	],
	entryComponents: [],
	exports: [],
	providers: []
})
export class SettingsModule {


}
