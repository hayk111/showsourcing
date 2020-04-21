import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TeamService } from '~core/erm';
import { EntityTableComponent, TableConfig } from '~common/tables/entity-table.component';
import { TeamUser, User } from '~core/erm';
import { defaultConfig } from '../default-columns/default-config';

@Component({
	selector: 'invitations-table-app',
	templateUrl: './invitations-table.component.html',
	styleUrls: ['./invitations-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvitationsTableComponent extends EntityTableComponent<TeamUser> {
	static DEFAULT_COLUMNS = [
		'email',
		'status'
	];
	static DEFAULT_TABLE_CONFIG = defaultConfig;
	@Input() columns = InvitationsTableComponent.DEFAULT_COLUMNS;
	@Input() tableConfig = InvitationsTableComponent.DEFAULT_TABLE_CONFIG;
	@Input() user: User;
	@Output() accessTypeUpdated = new EventEmitter<string>();
	@Output() showItemsPerPage = new EventEmitter<number>();
	isSelectableFn: Function;
	$teamOwner: Observable<User>;

	constructor(private teamSrv: TeamService) {
		super();
		this.isSelectableFn = (item) => this.isSelectable(item);
	}

	isSelectable(user: TeamUser) {
		return true;
		// return (this.user && this.teamOwner$ && user.user.id !== this.user.id);
	}
}
