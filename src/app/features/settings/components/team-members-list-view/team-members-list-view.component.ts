import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';

import { TeamUser, User } from '~models';
import { Sort } from '~shared/table/components/sort.interface';
import { ListViewComponent } from '~shared/list-page/list-view.component';


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

	constructor() {
		super();
		this.isSelectable = this.isSelectable.bind(this);
	}

	isSelectable(user: TeamUser) {
		return (this.user && this.teamOwner && user.user.id !== this.user.id);
	}
}
