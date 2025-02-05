import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { EntityMetadata } from '~models';
import { Status } from '~core/models/status.model';

@Component({
	selector: 'status-badge-app',
	templateUrl: './status-badge.component.html',
	styleUrls: ['./status-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadgeComponent {
	@Input() size = 's';

	@Input() status: Status;
	// we need to pass this so when the
	// status is null, because the product or supplier are new
	@Input() typeEntity: EntityMetadata;

	getType() {
		if (!this.status)
			return 'secondary-light';

		switch (this.status.category) {
			case 'new':
				return 'secondary';
			case 'inProgress':
				return 'primary';
			case 'validated':
				return 'success';
			case 'refused':
				return 'warn';
			default:
				return 'secondary-light';
		}
	}

}
