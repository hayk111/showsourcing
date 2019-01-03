import { Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { ListPageKey, ListPageService } from '~core/list-page';
import { InvitationFeatureService } from '~features/settings/services/invitation-feature.service';
import { ERM } from '~models';
import { TrackingComponent } from '~utils/tracking-component';
import { switchMap, filter } from 'rxjs/operators';
import { CloseEventType } from '~shared/dialog';

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

	constructor(
		private featureSrv: InvitationFeatureService,
		public listSrv: ListPageService<any, InvitationFeatureService>,
		public commonModalSrv: CommonModalService,
	) {
		super();
	}

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.INVITATION,
			entitySrv: this.featureSrv,
			searchedFields: ['email'],
			selectParams: { query: '', sortBy: 'email', descending: true },
			entityMetadata: ERM.TEAM_USER
		});
		// TODO remove below if page works properly,
		// I'm not sure why thierry added this

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
		this.commonModalSrv.openInvitationDialog().pipe(
			switchMap(_ => this.listSrv.refetch())
		).subscribe();
	}

}
