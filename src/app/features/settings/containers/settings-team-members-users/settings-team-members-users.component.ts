import { Component, NgModuleRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { InviteUserDlgComponent } from '~features/settings/components/invite-user-dlg/invite-user-dlg.component';
import { MemberFeatureService } from '~features/settings/services/member-feature.service';
import { TeamService, UserService } from '~entity-services';
import { ERM, TeamUser, User, ERM_TOKEN } from '~models';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { getProviders, ProviderKey } from '~core/list-page/list-page-providers.class';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'settings-team-members-users-app',
	templateUrl: './settings-team-members-users.component.html',
	styleUrls: ['./settings-team-members-users.component.scss'],
	providers: [
		ListPageDataService,
		ListPageViewService,
		SelectionWithFavoriteService,
		CommonDialogService
	]
})
export class SettingsTeamMembersUsersComponent extends AutoUnsub implements OnInit {
	teamOwner: boolean;
	user: User;
	hasSelected = false;
	initialPredicate = '';
	constructor(
		protected router: Router,
		protected userService: UserService,
		protected teamService: TeamService,
		protected featureSrv: MemberFeatureService,
		protected viewSrv: ListPageViewService<TeamUser>,
		public dataSrv: ListPageDataService<TeamUser, MemberFeatureService>,
		protected selectionSrv: SelectionWithFavoriteService,
		protected commonDlgSrv: CommonDialogService
	) {
		super();
	}

	ngOnInit() {
		this.dataSrv.setup({
			featureSrv: this.featureSrv,
			searchedFields: ['user.firstName'],
			initialSortBy: 'user.firstName',
			initialPredicate: ''
		});
		this.dataSrv.init();

		this.selectionSrv.selection$.pipe(
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

		this.dataSrv.sort({ sortBy: 'user.firstName' });
	}

	search(str: string) {
		this.dataSrv.currentSearch = `user.lastName CONTAINS[c] "${str}" ` +
			`OR user.firstName CONTAINS[c] "${str}" ` +
			`OR user.email CONTAINS[c] "${str}"`;
		this.dataSrv.refetch();
	}

	/** Opens the dialog for inviting a new user */
	openInviteDialog() {
		this.commonDlgSrv.openInvitationDialog();
	}

	updateAccessType({ member, accessType }: { member: TeamUser, accessType: string }) {
		this.featureSrv.updateAccessType([{ id: member.id, accessType }]).subscribe(() => {
			this.dataSrv.refetch();
			this.selectionSrv.unselectAll();
		});
	}

	updateAccessTypeSelected({ accessType }) {
		const items = Array.from(this.selectionSrv.selection.keys());
		this.featureSrv.updateAccessType(items.map(item => ({ id: item, accessType }))).subscribe(() => {
			this.dataSrv.refetch();
			this.selectionSrv.unselectAll();
		});
	}
}
