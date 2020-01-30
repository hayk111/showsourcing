import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Team, User } from '~core/erm';
import { TeamService, UserService, TeamUserService } from '~core/erm';
import { SettingsMembersService } from '~features/settings/services/settings-members.service';
import { ERM } from '~core/erm';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'settings-page-app',
	templateUrl: './settings-page.component.html',
	styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent extends AutoUnsub implements OnInit {
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
