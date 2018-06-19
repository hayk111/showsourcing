import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';


import {
	SettingsComponent, SettingsTeamMembersPageComponent
} from './containers';
import {
	SettingsProfileComponent, SettingsMenuComponent,
	SettingsMenuItemComponent, SettingsMenuItemLabelDirective,
	TeamMembersListViewComponent, SettingsMenuItemGroupComponent,
	InviteUserDlgComponent
} from './components';
import { UserModule } from '~features/user';
import { SharedModule } from '~shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TopPanelModule } from '~shared/top-panel/top-panel.module';
import { SelectionBarModule } from '~shared/selection-bar';
import { TableModule } from '~shared/table';
import { DialogModule } from '~shared/dialog/dialog.module';

import { MemberService } from '~features/settings/services/member.service';
import { SelectionService } from '~features/settings/services/selection.service';
import { MenuService } from '~features/settings/services/menu.service';

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
	],
	providers: [MemberService, SelectionService, MenuService],
	declarations: [
		SettingsComponent, SettingsTeamMembersPageComponent,
		SettingsProfileComponent, SettingsMenuComponent,
		SettingsMenuItemComponent, SettingsMenuItemLabelDirective,
		TeamMembersListViewComponent, SettingsMenuItemGroupComponent,
		InviteUserDlgComponent
	],
	entryComponents: [
		InviteUserDlgComponent
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
