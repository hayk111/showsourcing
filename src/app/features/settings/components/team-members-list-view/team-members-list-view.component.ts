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
	@Output() supplierSelect = new EventEmitter<string>();
	@Output() supplierUnselect = new EventEmitter<string>();
	@Output() supplierSelectAll = new EventEmitter<Map<string, boolean>>();
	@Output() supplierUnselectAll = new EventEmitter<Map<string, boolean>>();
	@Output() supplierOpen = new EventEmitter<string>();
	@Output() supplierFavorited = new EventEmitter<string>();
	@Output() supplierUnfavorited = new EventEmitter<string>();
	@Output() bottomReached = new EventEmitter<string>();
	@Output() sort = new EventEmitter<SortEvent>();

	constructor() { }

}
