import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { CustomDialogModule } from '~shared/custom-dialog/custom-dialog.module';
import { DialogModule } from '~shared/dialog/dialog.module';
import { FileModule } from '~shared/file';
import { SelectionBarModule } from '~shared/selection-bar';
import { SharedModule } from '~shared/shared.module';
import { SidenavModule } from '~shared/sidenav/sidenav.module';
import { TableModule } from '~shared/table';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule,
		RouterModule,
		TopPanelModule,
		DialogModule,
		DataManagementModule,
		SelectionBarModule, // used for selection bar at the bottom
		TableModule, // used by list view
		ContextMenuModule,
		SidenavModule,
		FileModule,
		CustomDialogModule
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
