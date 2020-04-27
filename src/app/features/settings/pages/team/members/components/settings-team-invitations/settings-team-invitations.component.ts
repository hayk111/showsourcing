import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ERM, SelectParamsConfig, TeamUser, User } from '~core/erm';
import { SettingsMembersService } from '~features/settings/services/settings-members.service';
import { AutoUnsub } from '~utils';
import { SelectionService, ListPageViewService } from '~core/list-page2';
import { ListFuseHelperService } from '~core/list-page2/list-fuse-helper.service';
import { FilterService } from '~core/filters/filter.service';
import { UserService } from '~core/auth/services';
import { FilterType } from '~core/filters';
import { MembersInvitationService } from '../../services/members-invitation.service';
import { InviteUserDlgComponent } from '~common/dialogs/custom-dialogs/invite-user-dlg/invite-user-dlg.component';
import { DialogService } from '~shared/dialog/services';
import { ApiService } from '~core/erm3/services/api.service';

@Component({
	selector: 'settings-team-invitations-app',
	templateUrl: './settings-team-invitations.component.html',
	styleUrls: ['./settings-team-invitations.component.scss'],
	providers: [
		ListPageViewService,
		ListFuseHelperService,
		SelectionService,
	]
})
export class SettingsTeamInvitationsComponent extends AutoUnsub
	implements OnInit {
	teamOwner: boolean;
	user: User;
	hasSelected = false;
	selectItemsConfig: SelectParamsConfig;
	erm = ERM;

	constructor(
		private dlgSrv: DialogService,
		private dlgCommonSrv: DialogCommonService,
		private apiSrv: ApiService,
		private userSrv: UserService,
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
		// TODO: implement filters for the list fuse helper
		this.filterSrv.setup([
			{ type: FilterType.STATUS, value: 'CREATED', equality: 'eq' },
			{ type: FilterType.DELETED, value: true }
		], ['name']);
		this.listHelper.setup('Invitation');
		this.membersInvitationSrv.invitationOpen$.subscribe(_ => this.openInviteDialog());
	}

		/** Opens the dialog for inviting a new user */
	openInviteDialog() {
		this.dlgCommonSrv.openInvitationDialog().data$
			.pipe(
				switchMap((entity) => {
					return this.apiSrv.create('Invitation', {
						...entity,
						teamRole: 'TEAMMEMBER'
					});
				}),
				tap(_ => this.listHelper.refetch())
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
