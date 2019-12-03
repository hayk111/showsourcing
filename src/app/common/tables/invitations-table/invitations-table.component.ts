import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EntityTableComponent } from '~common/tables/entity-table.component';
import { Invitation, User } from '~models';


@Component({
	selector: 'invitations-table-app',
	templateUrl: './invitations-table.component.html',
	styleUrls: ['./invitations-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvitationsTableComponent extends EntityTableComponent<Invitation> {

	@Input() teamOwner: boolean;
	@Input() user: User;
	@Output() accessTypeUpdated = new EventEmitter<string>();
	@Output() showItemsPerPage = new EventEmitter<number>();
	isSelectableFn: Function;

	constructor() {
		super();
		this.isSelectableFn = (item) => this.isSelectable(item);
	}

	isSelectable(invitation: Invitation) {
		return (this.teamOwner);
	}
}
