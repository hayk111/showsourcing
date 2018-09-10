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
		protected moduleRef: NgModuleRef<any>
	) {
	}

	/** Displays specified tab */
	displayTab(tabName: string) {
		this.selectedTab = tabName;
	}

	/** Opens the dialog for creating a new team */
	openNewTeamDialog() {
		this.dlgSrv.openFromModule(CreationDialogComponent, this.moduleRef, { type: ERM.TEAM, shouldRedirect: false });
	}

}
