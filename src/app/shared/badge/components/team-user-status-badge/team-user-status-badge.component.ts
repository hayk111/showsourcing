import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TeamUser } from '~core/models';
import { TeamUserStatus } from '~utils';

@Component({
	selector: 'team-user-status-badge-app',
	templateUrl: './team-user-status-badge.component.html',
	styleUrls: ['./team-user-status-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamUserStatusBadgeComponent implements OnInit {

	@Input() teamUser: TeamUser;
	@Input() size: 's' | 'ms' | 'm' | 'l' = 'm';
	@Output() update = new EventEmitter<boolean>();

	constructor() { }

	ngOnInit() { }

	// this is only done for teamUsers since we don't have it on the DB
	getTeamUserStatus() {
		let teamUserStatus = TeamUserStatus.CONTRIBUTOR;
		if (this.teamUser && this.teamUser.accessType)
			teamUserStatus = TeamUserStatus.TEAM_MEMBER;
		return teamUserStatus;
	}

	// this is only done for teamUsers since we don't have it on the DB
	getType() {
		let teamUserStatusColor = 'secondary'; // pending
		if (this.teamUser && this.teamUser.accessType)
			teamUserStatusColor = 'success'; // done
		return teamUserStatusColor;
	}

}
