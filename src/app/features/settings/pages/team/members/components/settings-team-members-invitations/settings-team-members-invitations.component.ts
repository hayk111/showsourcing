import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { switchMap, takeUntil } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SelectParamsConfig } from '~core/entity-services/_global/select-params';
import { ListPageService } from '~core/list-page';
import { SettingsInvitationService } from '~features/settings/services/settings-invitation.service';
import { EntityTypeEnum, ERM, Invitation, User } from '~models';
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
	selectItemsConfig: SelectParamsConfig;
	entityTypeEnum = EntityTypeEnum;

	constructor(
		private featureSrv: SettingsInvitationService,
		public listSrv: ListPageService<any, SettingsInvitationService>,
		public dialogCommonSrv: DialogCommonService,
		private translate: TranslateService
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			entitySrv: this.featureSrv,
			searchedFields: ['email'],
			selectParams: { query: '', sortBy: 'email', descending: true },
			entityMetadata: ERM.INVITATION,
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
		this.dialogCommonSrv.openInvitationDialog().pipe(
			switchMap(_ => this.listSrv.refetch())
		).subscribe();
	}

	updateAccessType({ invitation, accessType }: { invitation: Invitation, accessType: string }) {
		this.listSrv.update({ id: invitation.id, accessType });
	}

	getToolTipMsg() {
		return !this.teamOwner ? this.translate.instant('message.only-team-owners-can-invite') : null;
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = { take: Number(count) };
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

}
