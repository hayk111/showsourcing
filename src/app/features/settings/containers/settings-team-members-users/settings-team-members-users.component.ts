import { Component, OnInit } from '@angular/core';
import { takeUntil, switchMap } from 'rxjs/operators';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { ListPageKey, ListPageService } from '~core/list-page';
import { SettingsMembersService } from '~features/settings/services/settings-members.service';
import { ERM, TeamUser, User } from '~models';
import { AutoUnsub, translate } from '~utils';
import { UserService } from '~core/entity-services';
import { forkJoin } from 'rxjs';

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
		private featureSrv: SettingsMembersService,
		public listSrv: ListPageService<TeamUser, SettingsMembersService>,
		public commonModalSrv: CommonModalService,
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.TEAM_USER,
			entitySrv: this.featureSrv,
			searchedFields: ['user.firstName', 'user.lastName', 'user.email'],
			selectParams: { query: '', sortBy: 'user.firstName', descending: true },
			entityMetadata: ERM.TEAM_USER,
			originComponentDestroy$: this._destroy$
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
		this.commonModalSrv.openInvitationDialog();
	}

	updateAccessType({ accessType, userId }: { accessType: string, userId: string }) {
		this.featureSrv.updateAccessType(accessType, userId).pipe(
				switchMap(_ => this.listSrv.refetch())
			).subscribe(_ => this.listSrv.selectionSrv.unselectAll());
	}

	updateAccessTypeSelected(accessType) {
		const ids = this.listSrv.getSelectedIds();
		const calls = ids.map(id => this.featureSrv.updateAccessType(accessType, id));
		forkJoin(calls).subscribe(_ => this.listSrv.selectionSrv.unselectAll());
	}

	getTooltipMsg() {
		return !this.teamOwner ? translate('Only team owners can invite') : null;
	}
}
