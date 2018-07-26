import { Component, OnInit, NgModuleRef } from '@angular/core';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';
import { InviteUserDlgComponent } from '~features/settings/components/invite-user-dlg/invite-user-dlg.component';
import { MemberFeatureService } from '~features/settings/services/member-feature.service';
import { NewTaskDlgComponent } from '~features/tasks';
import { ERM, TeamUser, User } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterService, SearchService } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { StoreKey } from '~utils/store/store';

import { TeamService, UserService } from '~global-services';
import { CreationDialogComponent } from '~shared/generic-dialog';

@Component({
	selector: 'settings-team-members-page-app',
	templateUrl: './settings-team-members-page.component.html',
	styleUrls: ['./settings-team-members-page.component.scss'],
	providers: [
		FilterService,
		{ provide: 'storeKey', useValue: StoreKey.FILTER_TEAM_USERS },
		SelectionService
	]
})
export class SettingsTeamMembersPageComponent extends ListPageComponent<TeamUser, MemberFeatureService> implements OnInit {
	teamOwner: boolean;
	user: User;
	hasSelected = false;

	constructor(
		protected router: Router,
		protected memberSrv: MemberFeatureService,
		protected selectionSrv: SelectionService,
		protected filterSrv: FilterService,
		protected searchSrv: SearchService,
		protected dlgSrv: DialogService,
		protected userService: UserService,
		protected teamService: TeamService,
		protected moduleRef: NgModuleRef<any>
	) {
		super(router, memberSrv, selectionSrv, filterSrv, searchSrv, dlgSrv, moduleRef, ERM.TEAM_USER);
	}

	ngOnInit() {
		super.ngOnInit();
		this.selected$.pipe(
			takeUntil(this._destroy$)
		).subscribe(selected => {
			this.hasSelected = (selected.size > 0);
		});

		this.memberSrv.selectTeamOwner().pipe(
			takeUntil(this._destroy$)
		).subscribe(({ user, teamOwner }) => {
			this.teamOwner = teamOwner;
			this.user = user;
			this.teamOwner = true;
		});

		this.sort({ sortBy: 'user.firstName', sortOrder: 'DESC' });
	}

	/** Opens the dialog for creating a new team */
	openNewTeamDialog() {
		this.dlgSrv.open(CreationDialogComponent, { type: ERM.TEAM, shouldRedirect: false });
	}

	/** Opens the dialog for inviting a new user */
	openInviteDialog() {
		this.dlgSrv.openFromModule(InviteUserDlgComponent, this.moduleRef);
	}

	/** Updates the access type */
	accessTypeUpdated({ member, accessType }: { member?: TeamUser; accessType: string }) {
		if (member) {
			this.update({
				...member,
				accessType
			});
		} else {
			this.updateSelected({ accessType });
		}
	}

	/** Deletes the member */
	deleteOneMember(member: TeamUser) {
		this.deleteOne(member.id);
	}

}
