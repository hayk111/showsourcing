import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ERM, SelectParamsConfig, TeamUser, User } from '~core/erm';
import { SettingsMembersService } from '~features/settings/services/settings-members.service';
import { AutoUnsub } from '~utils';
import { SelectionService, ListPageViewService } from '~core/list-page2';
import { ListFuseHelperService } from '~core/list-page2/list-fuse-helper.service';
import { FilterService } from '~core/filters/filter.service';
import { DialogService } from '~shared/dialog/services';
import { InviteUserDlgComponent } from '~common/dialogs/custom-dialogs/invite-user-dlg/invite-user-dlg.component';
import { ApiService } from '~core/erm3/services/api.service';

@Component({
	selector: 'settings-team-members-users-app',
	templateUrl: './settings-team-members-users.component.html',
	styleUrls: ['./settings-team-members-users.component.scss'],
	providers: [
		ListPageViewService,
		ListFuseHelperService,
		SelectionService,
	]
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
		public listHelper: ListFuseHelperService,
		private dlgSrv: DialogService,
		private apiSrv: ApiService,
		public filterSrv: FilterService,
		public dialogCommonSrv: DialogCommonService,
		public viewSrv: ListPageViewService<TeamUser>,
		private translate: TranslateService,
		public selectionSrv: SelectionService
	) {
		super();
	}

	ngOnInit() {
		this.filterSrv.setup([], ['name']);
		this.listHelper.setup('TeamUser', 'Team'); // search initialized in controller-table

		this.viewSrv.setup({
			typename: 'TeamUser',
			destUrl: 'settings/team/members/components/settings-team-members-users',
			view: 'table',
		});

		this.featureSrv
			.selectTeamOwner()
			.pipe(takeUntil(this._destroy$))
			.subscribe(({ user, teamOwner }) => {
				this.teamOwner = teamOwner;
				this.user = <User>user;
			});
	}

	/** Opens the dialog for inviting a new user */
	openInviteDialog() {
		this.dlgSrv
			.open(InviteUserDlgComponent, {
				typename: 'Invitation',
				extra: {},
			})
			.data$.pipe(
				switchMap((entity) => {
					console.log('openInviteDialog -> entity', entity);

					return this.apiSrv.create('Invitation', {
						...entity,
						teamRole: 'TEAMOWNER'
					});
				})
			)
			.subscribe();
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
			.pipe(switchMap(_ => this.listHelper.refetch()))
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
}
