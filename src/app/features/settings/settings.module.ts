import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DialogCommonModule } from '~common/dialog/dialog-common.module';
import { DataManagementModule } from '~features/data-management/data-management.module';
import {
	InvitationsListViewComponent,
	InviteUserDlgComponent,
	SettingsProfileComponent,
	TeamMembersListViewComponent,
} from '~features/settings/components';
import { ChangePswdDlgComponent } from '~features/settings/components/change-pswd-dlg/change-pswd-dlg.component';
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
import { InvitationFeatureService } from '~features/settings/services/invitation-feature.service';
import { MemberFeatureService } from '~features/settings/services/member-feature.service';
import { SharedModule } from '~shared/shared.module';

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		DataManagementModule,
		DialogCommonModule
	],
	declarations: [
		SettingsComponent, SettingsTeamMembersPageComponent,
		SettingsTeamMembersUsersComponent, SettingsTeamMembersInvitationsComponent,
		SettingsProfileComponent, TeamMembersListViewComponent,
		SettingsFieldsPageComponent, SettingsWorkflowsPageComponent,
		InviteUserDlgComponent, CompanyProfileCardComponent,
		ProfileCardComponent, ChangePswdDlgComponent,
		InvitationsListViewComponent
	],
	entryComponents: [
		InviteUserDlgComponent, ChangePswdDlgComponent
	],
	exports: [],
	providers: [
		MemberFeatureService, InvitationFeatureService
	]
})
export class SettingsModule {


}
