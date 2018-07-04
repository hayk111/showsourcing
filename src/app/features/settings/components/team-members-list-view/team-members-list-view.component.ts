import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { TeamUser } from '~models';
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
	@Output() accessTypeUpdated = new EventEmitter<string>();

	constructor() {
		super();
	}
}
