import {
	Component, ChangeDetectionStrategy, Input,
	Output, EventEmitter, ViewChild, TemplateRef
} from '@angular/core';

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
	@Output() memberSelectAll = new EventEmitter<string[]>();
	@Output() memberUnselectAll = new EventEmitter<null>();
	@Output() memberOpen = new EventEmitter<string>();
	@Output() bottomReached = new EventEmitter<string>();
	@Output() accessTypeUpdated = new EventEmitter<string>();
	@Output() sort = new EventEmitter<SortEvent>();
	@Output() delete = new EventEmitter<TeamUser>();

	@ViewChild('contextualMenu') contextualMenuTemplate: TemplateRef<any>;

	accessTypes = [
		{ label: 'Read Only', value: 'ReadOnly' },
		{ label: 'Full Access', value: 'FullAccess' }
	];
}
