import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeamService } from '~core/entity-services';
import { EntityTableComponent } from '~common/tables/entity-table.component';
import { TeamUser, User } from '~models';


@Component({
	selector: 'team-members-table-app',
	templateUrl: './team-members-table.component.html',
	styleUrls: ['./team-members-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMembersTableComponent extends EntityTableComponent<TeamUser> implements OnInit {

	@Input() teamOwner: boolean;
	@Input() user: User;
	@Output() accessTypeUpdated = new EventEmitter<string>();
	@Output() showItemsPerPage = new EventEmitter<number>();
	contextualMenuOpen = false;
	isSelectableFn: Function;
	$teamOwner: Observable<User>;

	constructor(private teamSrv: TeamService) {
		super();
		this.isSelectableFn = (item) => this.isSelectable(item);
	}

	ngOnInit() {
		this.$teamOwner = this.teamSrv.teamSelectedTeamRealm$.pipe(
			map(team => team.ownerUser)
		);
	}

	isSelectable(user: TeamUser) {
		return (this.user && this.teamOwner && user.user.id !== this.user.id);
	}
}
