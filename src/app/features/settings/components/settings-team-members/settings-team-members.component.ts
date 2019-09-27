import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '~models';
import { TeamService } from '~core/entity-services';

import { ERM } from '~models';

@Component({
	selector: 'settings-team-members-app',
	templateUrl: './settings-team-members.component.html',
	styleUrls: ['./settings-team-members.component.scss']
})
export class SettingsTeamMembersComponent implements OnInit {

	team$: Observable<Team>;

	erm = ERM;

	constructor(private teamSrv: TeamService) {}

	ngOnInit() {
		this.team$ = this.teamSrv.selectTeam();
	}
}
