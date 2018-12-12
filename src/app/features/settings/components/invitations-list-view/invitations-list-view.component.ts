import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ListViewComponent } from '~core/list-page/list-view.component';
import { Invitation, User } from '~models';


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
