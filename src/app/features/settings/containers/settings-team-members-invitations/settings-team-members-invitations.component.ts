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

@Component({
	selector: 'settings-team-members-invitations-app',
	templateUrl: './settings-team-members-invitations.component.html',
	styleUrls: ['./settings-team-members-invitations.component.scss'],
	providers: [
		ListPageDataService,
		ListPageViewService,
		SelectionWithFavoriteService,
		CommonDialogService
	]
})
export class SettingsTeamMembersInvitationsComponent extends TrackingComponent implements OnInit {
	hasSelected = false;
	initialPredicate = '';

	constructor(
		public router: Router,
		public userService: UserService,
		public teamService: TeamService,
		public moduleRef: NgModuleRef<any>,
		public featureSrv: InvitationFeatureService,
		public viewSrv: ListPageViewService<Invitation>,
		public dataSrv: ListPageDataService<Invitation, InvitationFeatureService>,
		public selectionSrv: SelectionWithFavoriteService,
		public commonDlgSrv: CommonDialogService,
	) {
		super();
	}

	ngOnInit() {
		this.dataSrv.setup({
			featureSrv: this.featureSrv,
			searchedFields: ['name'],
			initialSortBy: 'email'
		});
		this.dataSrv.init();
		this.viewSrv.setup(ERM.TEAM_USER);
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

		this.dataSrv.sort({ sortBy: 'email' });
	}

	search(str: string) {
		this.dataSrv.currentSearch = `email CONTAINS[c] "${str}"`;
		this.dataSrv.onPredicateChange();
	}

	/** Opens the dialog for inviting a new user */
	openInviteDialog() {
		const callback = () => {
			this.dataSrv.refetch();
		};
		this.commonDlgSrv.openInvitationDialog({ callback });
	}

}
