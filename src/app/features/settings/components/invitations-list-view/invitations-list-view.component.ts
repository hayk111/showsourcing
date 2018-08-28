import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';

import { TeamUser, User, Invitation } from '~models';
import { Sort } from '~shared/table/components/sort.interface';
import { ListViewComponent } from '~shared/list-page/list-view.component';


@Component({
	selector: 'invitations-list-view-app',
	templateUrl: './invitations-list-view.component.html',
	styleUrls: ['./invitations-list-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvitationsListViewComponent extends ListViewComponent<Invitation> {
	@Input() teamOwner: boolean;
	@Input() user: User;
	@Output() accessTypeUpdated = new EventEmitter<string>();

}
