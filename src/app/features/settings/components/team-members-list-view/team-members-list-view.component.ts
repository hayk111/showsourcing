import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { TeamUser } from '~models';
import { SortEvent } from '~shared/table/components/sort-event.interface';

@Component({
	selector: 'team-members-list-view-app',
	templateUrl: './team-members-list-view.component.html',
	styleUrls: ['./team-members-list-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamMembersListViewComponent {
	@Input() selection: Map<string, boolean>;
	@Input() members: Array<TeamUser>;
	@Input() pending = true;
	@Output() memberSelect = new EventEmitter<string>();
	@Output() memberUnselect = new EventEmitter<string>();
	@Output() memberSelectAll = new EventEmitter<Map<string, boolean>>();
	@Output() memberUnselectAll = new EventEmitter<Map<string, boolean>>();
	@Output() memberOpen = new EventEmitter<string>();
	@Output() memberFavorited = new EventEmitter<string>();
	@Output() memberUnfavorited = new EventEmitter<string>();
	@Output() bottomReached = new EventEmitter<string>();
	@Output() sort = new EventEmitter<SortEvent>();

	constructor() { }

}
