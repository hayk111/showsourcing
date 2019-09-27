import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Team, User } from '~models';
import { TeamService, UserService, TeamUserService } from '~core/entity-services';
import { SettingsMembersService } from '~features/settings/services/settings-members.service';
import { ERM } from '~models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'settings-team-members-app',
	templateUrl: './settings-team-members.component.html',
	styleUrls: ['./settings-team-members.component.scss']
})
export class SettingsTeamMembersComponent extends AutoUnsub implements OnInit {
	teamOwner: boolean;
	team: Team;
	erm = ERM;

	constructor(
		private teamSrv: TeamService,
		private userSrv: UserService,
		private teamUserSrv: TeamUserService,
		private featureSrv: SettingsMembersService,
	) {
		super();
	}

	ngOnInit() {
		this.team = this.teamSrv.selectedTeamSync;

		this.featureSrv.selectTeamOwner().pipe(
			takeUntil(this._destroy$)
		).subscribe(({ teamOwner }) => {
			this.teamOwner = teamOwner;
		});
	}

	updateTeamName({ teamName }) {
		if (teamName.length) {
			this.team.name = teamName;
			this.teamSrv.update(this.team).subscribe();
		}
	}
}
