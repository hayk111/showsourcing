import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Team, User } from '~core/erm3/models';
import { TeamService, UserService } from '~core/auth';
import { SettingsMembersService } from '~features/settings/services/settings-members.service';
import { ERM } from '~core/erm';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'settings-page-app',
	templateUrl: './settings-page.component.html',
	styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent extends AutoUnsub implements OnInit {
	team$: Observable<Team>;
	team: Team;
	erm = ERM;

	constructor(
		private teamSrv: TeamService,
	) {
		super();
	}

	ngOnInit() {
		this.team$ = this.teamSrv.getTeamById(TeamService.teamSelected.id).pipe(tap(team => this.team = team));
	}

	updateTeamName({ teamName }) {
		if (teamName.length) {
			this.teamSrv.update({
				id: TeamService.teamSelected.id,
				name: teamName
			}).subscribe();
		}
	}
}
