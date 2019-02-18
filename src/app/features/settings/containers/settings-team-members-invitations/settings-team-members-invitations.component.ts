import { Component, OnInit } from '@angular/core';
import { switchMap, takeUntil } from 'rxjs/operators';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { ListPageKey, ListPageService } from '~core/list-page';
import { InvitationFeatureService } from '~features/settings/services/invitation-feature.service';
import { ERM, Invitation, User } from '~models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'settings-team-members-invitations-app',
	templateUrl: './settings-team-members-invitations.component.html',
	styleUrls: ['./settings-team-members-invitations.component.scss'],
	providers: [
		ListPageService
	]
})
export class SettingsTeamMembersInvitationsComponent extends AutoUnsub implements OnInit {
	teamOwner: boolean;
	user: User;
	hasSelected = false;

	constructor(
		private featureSrv: InvitationFeatureService,
		public listSrv: ListPageService<any, InvitationFeatureService>,
		public commonModalSrv: CommonModalService,
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.INVITATION,
			entitySrv: this.featureSrv,
			searchedFields: ['email'],
			selectParams: { query: '', sortBy: 'email', descending: true },
			entityMetadata: ERM.TEAM_USER
		});

		this.listSrv.selectionSrv.selection$.pipe(
			takeUntil(this._destroy$)
		).subscribe(selected => {
			this.hasSelected = (selected.size > 0);
		});

		this.featureSrv.selectTeamOwner().pipe(
			takeUntil(this._destroy$)
		).subscribe(({ user, teamOwner }) => {
			this.teamOwner = teamOwner;
			this.user = <User>user;
		});
	}

	/** Opens the dialog for inviting a new user */
	openInviteDialog() {
		this.commonModalSrv.openInvitationDialog().pipe(
			switchMap(_ => this.listSrv.refetch())
		).subscribe();
	}

	updateAccessType({ invitation, accessType }: { invitation: Invitation, accessType: string }) {
		this.listSrv.update({ id: invitation.id, accessType });
	}

}
