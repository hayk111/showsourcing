import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ERM, SelectParamsConfig, TeamUser, User } from '~core/erm';
import { FilterService } from '~core/filters/filter.service';
import { ListPageViewService, SelectionService } from '~core/list-page2';
import { ListFuseHelperService } from '~core/list-page2/list-fuse-helper.service';
import { SettingsMembersService } from '~features/settings/services/settings-members.service';
import { AutoUnsub } from '~utils';
import { MembersInvitationService } from '../../services/members-invitation.service';

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
		public filterSrv: FilterService,
		public dialogCommonSrv: DialogCommonService,
		public viewSrv: ListPageViewService<TeamUser>,
		private translate: TranslateService,
		public selectionSrv: SelectionService,
		public membersInvitationSrv: MembersInvitationService,
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
				// commenting this because of build errors,
				// there is no good reason to still have erm imports here
				// this.user = <User>user;
			});
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
