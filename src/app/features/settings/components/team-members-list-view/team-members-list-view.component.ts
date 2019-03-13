import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeamService } from '~core/entity-services';
import { ListViewComponent } from '~core/list-page/list-view.component';
import { TeamUser, User } from '~models';


@Component({
	selector: 'team-members-list-view-app',
	templateUrl: './team-members-list-view.component.html',
	styleUrls: ['./team-members-list-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMembersListViewComponent extends ListViewComponent<TeamUser> implements OnInit {

	@Input() teamOwner: boolean;
	@Input() user: User;
	@Output() accessTypeUpdated = new EventEmitter<string>();
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
