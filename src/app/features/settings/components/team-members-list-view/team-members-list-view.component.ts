import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TeamUser, User } from '~models';
import { ListViewComponent } from '~core/list-page/list-view.component';


@Component({
	selector: 'team-members-list-view-app',
	templateUrl: './team-members-list-view.component.html',
	styleUrls: ['./team-members-list-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamMembersListViewComponent extends ListViewComponent<TeamUser> {
	@Input() teamOwner: boolean;
	@Input() user: User;
	@Output() accessTypeUpdated = new EventEmitter<string>();
	isSelectableFn: Function;

	constructor() {
		super();
		this.isSelectableFn = (item) => this.isSelectable(item);
	}

	isSelectable(user: TeamUser) {
		return (this.user && this.teamOwner && user.user.id !== this.user.id);
	}
}
