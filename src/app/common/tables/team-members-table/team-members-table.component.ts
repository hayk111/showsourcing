import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeamService } from '~core/erm';
import { EntityTableComponent, TableConfig } from '~common/tables/entity-table.component';
import { TeamUser, User } from '~core/erm';
import { defaultConfig } from '../default-columns/default-config';

@Component({
	selector: 'team-members-table-app',
	templateUrl: './team-members-table.component.html',
	styleUrls: ['./team-members-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMembersTableComponent extends EntityTableComponent<TeamUser> {
	static DEFAULT_COLUMNS = [
		'name',
		'email',
		'status'
	];
	static DEFAULT_TABLE_CONFIG = defaultConfig;
	@Input() columns = TeamMembersTableComponent.DEFAULT_COLUMNS;
	@Input() tableConfig = TeamMembersTableComponent.DEFAULT_TABLE_CONFIG;
	@Input() user: User;
	@Output() accessTypeUpdated = new EventEmitter<string>();
	@Output() showItemsPerPage = new EventEmitter<number>();
	isSelectableFn: Function;
	$teamOwner: Observable<User>;

	constructor(private teamSrv: TeamService) {
		super();
		this.isSelectableFn = (item) => this.isSelectable(item);
	}

	isSelectable(user: TeamUser) {
		return true;
		// return (this.user && this.teamOwner$ && user.user.id !== this.user.id);
	}

	getStatus(status: string) {
		switch (status) {
			case 'CREATED':
				return 'Invitation Sent';
			case 'TEAMOWNER':
				return 'Team Owner';
			case 'TEAMMEMBER':
				return 'Team Member';
			case 'TEAMVIEWER':
				return 'Team Viewer';
			default:
				return status;
		}
	}
}
