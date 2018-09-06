import { Component, OnInit, NgModuleRef } from '@angular/core';
import { Router } from '@angular/router';
import { zip } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';
import { InviteUserDlgComponent } from '~features/settings/components/invite-user-dlg/invite-user-dlg.component';
import { MemberFeatureService } from '~features/settings/services/member-feature.service';
import { NewTaskDlgComponent } from '~features/tasks';
import { ERM, TeamUser, User } from '~models';
import { DialogService } from '~shared/dialog';
import { SearchService, FilterType } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';

import { TeamService, UserService } from '~global-services';
import { CreationDialogComponent } from '~shared/custom-dialog';

@Component({
	selector: 'settings-team-members-users-app',
	templateUrl: './settings-team-members-users.component.html',
	styleUrls: ['./settings-team-members-users.component.scss'],
	providers: [
		SelectionService
	]
})
export class SettingsTeamMembersUsersComponent extends ListPageComponent<TeamUser, MemberFeatureService> implements OnInit {
	teamOwner: boolean;
	user: User;
	hasSelected = false;

	constructor(
		protected router: Router,
		protected memberSrv: MemberFeatureService,
		protected selectionSrv: SelectionService,
		protected searchSrv: SearchService,
		protected dlgSrv: DialogService,
		protected userService: UserService,
		protected teamService: TeamService,
		protected moduleRef: NgModuleRef<any>
	) {
		super(router, memberSrv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.TEAM_USER);
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
			this.user = <User>user;
			this.teamOwner = true;
		});

		this.sort({ sortBy: 'user.firstName' });
	}

	search(str: string) {
		// TODO: cedric put this back in

		// if (str)
		// 	this.filterList.upsertFilter({
		// 		type: FilterType.SEARCH,
		// 		value: str,
		// 		fields: ['user.lastName', 'user.firstName', 'user.email']
		// 	});
		// else
		// 	this.filterList.removeFilterType(FilterType.SEARCH);
	}

	/** Opens the dialog for inviting a new user */
	openInviteDialog() {
		this.dlgSrv.openFromModule(InviteUserDlgComponent, this.moduleRef);
	}

}
