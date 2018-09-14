import { Component, OnInit, NgModuleRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
		protected moduleRef: NgModuleRef<any>,
		protected router: Router,
		protected route: ActivatedRoute
	) {
	}

	/** Displays specified tab */
	displayTab(tabName: string) {
		this.selectedTab = tabName;
	}

	/** Opens the dialog for creating a new team */
	redirectNewTeamScreen() {
		this.router.navigate(['../../../user/create-a-team'], { relativeTo: this.route });
	}

}
