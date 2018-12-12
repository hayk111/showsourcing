import { Component, OnInit } from '@angular/core';
import { CommonDialogService } from '~common/modals/services/common-dialog.service';
import { ListPageKey, ListPageService } from '~core/list-page';
import { InvitationFeatureService } from '~features/settings/services/invitation-feature.service';
import { ERM } from '~models';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'settings-team-members-invitations-app',
	templateUrl: './settings-team-members-invitations.component.html',
	styleUrls: ['./settings-team-members-invitations.component.scss'],
	providers: [
		ListPageService
	]
})
export class SettingsTeamMembersInvitationsComponent extends TrackingComponent implements OnInit {
	hasSelected = false;
	initialPredicate = '';

	constructor(
		private featureSrv: InvitationFeatureService,
		public listSrv: ListPageService<any, InvitationFeatureService>,
		public commonDlgSrv: CommonDialogService,
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.INVITATION,
			entitySrv: this.featureSrv,
			searchedFields: ['email'],
			currentSort: { sortBy: 'email', descending: true },
			entityMetadata: ERM.TEAM_USER
		});
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
	}

	/** Opens the dialog for inviting a new user */
	openInviteDialog() {
		const callback = () => this.listSrv.refetch();
		this.commonDlgSrv.openInvitationDialog({ callback });
	}

}
