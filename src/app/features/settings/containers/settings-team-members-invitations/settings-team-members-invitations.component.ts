import { Component, OnInit, NgModuleRef } from '@angular/core';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';
import { InviteUserDlgComponent } from '~features/settings/components/invite-user-dlg/invite-user-dlg.component';
import { InvitationFeatureService } from '~features/settings/services/invitation-feature.service';
import { NewTaskDlgComponent } from '~features/tasks';
import { ERM, Invitation } from '~models';
import { DialogService } from '~shared/dialog';
import { SearchService } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';

import { TeamService, UserService } from '~global-services';
import { CreationDialogComponent } from '~shared/custom-dialog';

@Component({
	selector: 'settings-team-members-invitations-app',
	templateUrl: './settings-team-members-invitations.component.html',
	styleUrls: ['./settings-team-members-invitations.component.scss'],
	providers: [
		SelectionService
	]
})
export class SettingsTeamMembersInvitationsComponent extends ListPageComponent<Invitation, InvitationFeatureService> implements OnInit {
	hasSelected = false;

	constructor(
		protected router: Router,
		protected invitationSrv: InvitationFeatureService,
		protected selectionSrv: SelectionService,
		protected searchSrv: SearchService,
		protected dlgSrv: DialogService,
		protected userService: UserService,
		protected teamService: TeamService,
		protected moduleRef: NgModuleRef<any>
	) {
		super(router, invitationSrv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.TEAM_USER);
	}

	ngOnInit() {
		super.ngOnInit();
		/* this.selected$.pipe(
			takeUntil(this._destroy$)
		).subscribe(selected => {
			this.hasSelected = (selected.size > 0);
		});

		this.invitationSrv.selectTeamOwner().pipe(
			takeUntil(this._destroy$)
		).subscribe(({ user, teamOwner }) => {
			this.teamOwner = teamOwner;
			this.user = user;
			this.teamOwner = true;
		}); */

		this.sort({ sortBy: 'email' });
	}

	openInviteDialog() {
		// TODO
	}

}