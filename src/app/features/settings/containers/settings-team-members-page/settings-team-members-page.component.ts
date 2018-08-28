import { Component, OnInit, NgModuleRef } from '@angular/core';
import { ERM, TeamUser, User } from '~models';
import { DialogService } from '~shared/dialog';
import { CreationDialogComponent } from '~shared/custom-dialog';

@Component({
	selector: 'settings-team-members-page-app',
	templateUrl: './settings-team-members-page.component.html',
	styleUrls: ['./settings-team-members-page.component.scss'],
})
export class SettingsTeamMembersPageComponent {
	selectedTab = 'team-members';

	constructor(
		protected dlgSrv: DialogService,
	) {
	}

	/** Displays specified tab */
	displayTab(tabName: string) {
		this.selectedTab = tabName;
	}

	/** Opens the dialog for creating a new team */
	openNewTeamDialog() {
		this.dlgSrv.open(CreationDialogComponent, { type: ERM.TEAM, shouldRedirect: false });
	}

}
