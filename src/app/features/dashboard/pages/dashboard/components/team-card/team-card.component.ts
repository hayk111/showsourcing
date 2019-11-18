import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { TeamService, TeamUserService } from '~entity-services';
import { TeamUser, Team, User } from '~models';
import { Observable } from 'rxjs';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'team-card-app',
	templateUrl: './team-card.component.html',
	styleUrls: ['./team-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamCardComponent extends TrackingComponent implements OnInit {

	members$: Observable<TeamUser[]>;
	team$: Observable<Team>;

	@Output() inviteTeam = new EventEmitter<null>();

	constructor(
		private teamUserSrv: TeamUserService,
		private teamSrv: TeamService
	) {
		super();
	}

	ngOnInit() {
		this.members$ = this.teamUserSrv.queryAll();
		this.team$ = this.teamSrv.teamSelected$;
	}

}
