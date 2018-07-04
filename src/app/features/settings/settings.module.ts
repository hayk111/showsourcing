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

import {
	InviteUserDlgComponent,
	NewTeamDlgComponent,
	SettingsProfileComponent,
	TeamMembersListViewComponent,
} from './components';
import {
	SettingsComponent,
	SettingsTeamMembersPageComponent,
	SettingsFieldsPageComponent,
	SettingsWorkflowsPageComponent
} from './containers';
import { CompanyProfileCardComponent } from './components/company-profile-card/company-profile-card.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';

@NgModule({
	imports: [
		SharedModule,
		ReactiveFormsModule,
		RouterModule,
		TopPanelModule,
		DialogModule,
		UserModule.forChild(),
		SelectionBarModule, // used for selection bar at the bottom
		TableModule, // used by list view
		ContextMenuModule,
		SidenavModule
	],
	providers: [MemberFeatureService, InvitationFeatureService],
	declarations: [
		SettingsComponent, SettingsTeamMembersPageComponent,
		SettingsProfileComponent, TeamMembersListViewComponent,
		SettingsFieldsPageComponent, SettingsWorkflowsPageComponent,
		InviteUserDlgComponent, NewTeamDlgComponent, CompanyProfileCardComponent, ProfileCardComponent
	],
	entryComponents: [
		InviteUserDlgComponent, NewTeamDlgComponent
	],
	exports: [],
})
export class SettingsModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SettingsModule,
			providers: []
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: SettingsModule,
		};
	}

}
