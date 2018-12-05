import { Component, NgModuleRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InviteUserDlgComponent } from '~features/settings/components/invite-user-dlg/invite-user-dlg.component';
import { InvitationFeatureService } from '~features/settings/services/invitation-feature.service';
import { TeamService, UserService } from '~entity-services';
import { ERM, Invitation, ERM_TOKEN } from '~models';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { TrackingComponent } from '~utils/tracking-component';
import { getProviders, ProviderKey } from '~core/list-page/list-page-providers.class';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { ListPageService, ListPageKey } from '~core/list-page';

@Component({
	selector: 'settings-team-members-invitations-app',
	templateUrl: './settings-team-members-invitations.component.html',
	styleUrls: ['./settings-team-members-invitations.component.scss'],
	providers: [
		ListPageService
	]
})
export class SettingsTeamMembersInvitationsComponent extends TrackingComponent implements OnInit {
	hasSelected = false;
	initialPredicate = '';

	constructor(
		private featureSrv: InvitationFeatureService,
		public listSrv: ListPageService<any, InvitationFeatureService>,
		public commonDlgSrv: CommonDialogService,
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.INVITATION,
			entitySrv: this.featureSrv,
			searchedFields: ['email'],
			initialSortBy: 'email',
			entityMetadata: ERM.TEAM_USER
		});
		/* this.selected$.pipe(
			takeUntil(this._destroy$)
		).subscribe(selected => {
			this.hasSelected = (selected.size > 0);
		});

		this.invitationSrv.selectTeamOwner().pipe(
			takeUntil(this._destroy$)
		).subscribe(({ user, teamOwner }) => {
			this.teamOwner = teamOwner;
			this.user = user;
			this.teamOwner = true;
		}); */
	}

	/** Opens the dialog for inviting a new user */
	openInviteDialog() {
		const callback = () => this.listSrv.refetch();
		this.commonDlgSrv.openInvitationDialog({ callback });
	}

}
