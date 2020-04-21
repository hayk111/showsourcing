import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ERM, SelectParamsConfig, TeamUser, User } from '~core/erm';
import { SettingsMembersService } from '~features/settings/services/settings-members.service';
import { AutoUnsub } from '~utils';
import { SelectionService, ListPageViewService } from '~core/list-page2';
import { ListFuseHelperService } from '~core/list-page2/list-fuse-helper.service';
import { FilterService } from '~core/filters/filter.service';
import { UserService } from '~core/auth/services';
import { FilterType } from '~core/filters';

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
		private userSrv: UserService,
		private featureSrv: SettingsMembersService,
		public listHelper: ListFuseHelperService,
		public filterSrv: FilterService,
		public dialogCommonSrv: DialogCommonService,
		public viewSrv: ListPageViewService<TeamUser>,
		private translate: TranslateService,
		public selectionSrv: SelectionService
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
