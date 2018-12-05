import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { ListPageKey, ListPageService } from '~core/list-page';
import { MemberFeatureService } from '~features/settings/services/member-feature.service';
import { ERM, TeamUser, User } from '~models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'settings-team-members-users-app',
	templateUrl: './settings-team-members-users.component.html',
	styleUrls: ['./settings-team-members-users.component.scss'],
	providers: [
		ListPageService
	]
})
export class SettingsTeamMembersUsersComponent extends AutoUnsub implements OnInit {
	teamOwner: boolean;
	user: User;
	hasSelected = false;

	constructor(
		private featureSrv: MemberFeatureService,
		public listSrv: ListPageService<TeamUser, MemberFeatureService>,
		public commonDlgSrv: CommonDialogService
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.TEAM_USER,
			entitySrv: this.featureSrv,
			searchedFields: ['user.firstName', 'user.lastName', 'user.email'],
			initialSortBy: 'user.firstName',
			initialPredicate: '',
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
			this.teamOwner = true;
		});

	}

	/** Opens the dialog for inviting a new user */
	openInviteDialog() {
		this.commonDlgSrv.openInvitationDialog();
	}

	updateAccessType({ member, accessType }: { member: TeamUser, accessType: string }) {
		this.featureSrv.updateAccessType([{ id: member.id, accessType }]).subscribe(() => {
			this.listSrv.refetch();
			this.listSrv.selectionSrv.unselectAll();
		});
	}

	updateAccessTypeSelected({ accessType }) {
		const ids = this.listSrv.selectionSrv.getSelectionIds();
		this.featureSrv.updateAccessType(ids.map(id => ({ id, accessType })))
			.subscribe(() => {
				this.listSrv.refetch();
				this.listSrv.selectionSrv.unselectAll();
			});
	}
}
