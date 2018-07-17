import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MemberFeatureService } from '~features/settings/services/member-feature.service';
import { InvitationFeatureService } from '~features/settings/services/invitation-feature.service';
import { MenuService } from '~features/settings/services/menu.service';
import { UserModule } from '~features/user';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { DialogModule } from '~shared/dialog/dialog.module';
import { SelectionBarModule } from '~shared/selection-bar';
import { SharedModule } from '~shared/shared.module';
import { SidenavModule } from '~shared/sidenav/sidenav.module';
import { TableModule } from '~shared/table';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { routes } from './routes';

import {
	InviteUserDlgComponent,
	NewTeamDlgComponent,
	SettingsProfileComponent,
	TeamMembersListViewComponent,
} from '~features/settings/components';
import {
	SettingsComponent,
	SettingsTeamMembersPageComponent,
	SettingsFieldsPageComponent,
	SettingsWorkflowsPageComponent
} from '~features/settings/containers';
import { CompanyProfileCardComponent } from '~features/settings/components/company-profile-card/company-profile-card.component';
import { ProfileCardComponent } from '~features/settings/components/profile-card/profile-card.component';
import { FileModule } from '~shared/file';
import { ChangePswdDlgComponent } from '~features/settings/components/change-pswd-dlg/change-pswd-dlg.component';
import { SettingsProfileService } from '~features/settings/services/settings-profile.service';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule,
		RouterModule,
		TopPanelModule,
		DialogModule,
		UserModule,
		SelectionBarModule, // used for selection bar at the bottom
		TableModule, // used by list view
		ContextMenuModule,
		SidenavModule,
		FileModule
	],
	declarations: [
		SettingsComponent, SettingsTeamMembersPageComponent,
		SettingsProfileComponent, TeamMembersListViewComponent,
		SettingsFieldsPageComponent, SettingsWorkflowsPageComponent,
		InviteUserDlgComponent, NewTeamDlgComponent, CompanyProfileCardComponent,
		ProfileCardComponent, ChangePswdDlgComponent
	],
	entryComponents: [
		InviteUserDlgComponent, NewTeamDlgComponent, ChangePswdDlgComponent
	],
	exports: [],
})
export class SettingsModule {


}
