import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ERM, SelectParamsConfig, TeamUser, User } from '~core/erm';
import { ListPageService, SelectionService } from '~core/list-page';
import { SettingsMembersService } from '~features/settings/services/settings-members.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'settings-team-members-users-app',
	templateUrl: './settings-team-members-users.component.html',
	styleUrls: ['./settings-team-members-users.component.scss'],
	providers: [ListPageService, SelectionService]
})
export class SettingsTeamMembersUsersComponent extends AutoUnsub
	implements OnInit {
	teamOwner: boolean;
	user: User;
	hasSelected = false;
	selectItemsConfig: SelectParamsConfig;
	erm = ERM;

	constructor(
		private featureSrv: SettingsMembersService,
		public listSrv: ListPageService<TeamUser, SettingsMembersService>,
		public dialogCommonSrv: DialogCommonService,
		private translate: TranslateService,
		private selectionSrv: SelectionService
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			entitySrv: this.featureSrv,
			searchedFields: ['user.firstName', 'user.lastName', 'user.email'],
			selectParams: { query: '', sortBy: 'user.firstName', descending: true },
			entityMetadata: ERM.TEAM_USER,
			originComponentDestroy$: this._destroy$
		});

		this.selectionSrv.selection$
			.pipe(takeUntil(this._destroy$))
			.subscribe(selected => {
				this.hasSelected = selected.size > 0;
			});

		this.featureSrv
			.selectTeamOwner()
			.pipe(takeUntil(this._destroy$))
			.subscribe(({ user, teamOwner }) => {
				this.teamOwner = teamOwner;
				this.user = <User>user;
			});

		this.featureSrv.invitationAdd$.subscribe(invitation => {
			this.listSrv.combine(invitation);
		});
	}

	/** Opens the dialog for inviting a new user */
	openInviteDialog() {
		this.dialogCommonSrv.openInvitationDialog();
	}

	updateAccessType({
		accessType,
		userId
	}: {
		accessType: string;
		userId: string;
	}) {
		this.featureSrv
			.updateAccessType(accessType, userId)
			.pipe(switchMap(_ => this.listSrv.refetch()))
			.subscribe(_ => this.selectionSrv.unselectAll());
	}

	updateAccessTypeSelected(accessType) {
		const ids = this.selectionSrv.getSelectedIds();
		const calls = ids.map(id =>
			this.featureSrv.updateAccessType(accessType, id)
		);
		forkJoin(calls).subscribe(_ => this.selectionSrv.unselectAll());
	}

	getTooltipMsg() {
		return !this.teamOwner
			? this.translate.instant('message.only-team-owners-can-invite')
			: null;
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = { take: Number(count) };
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}
}
