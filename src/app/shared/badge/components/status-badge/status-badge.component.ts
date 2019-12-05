import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Status } from '~core/models/status.model';
import { EntityMetadata } from '~models';
import { StatusUtils } from '~utils';

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

	statusUtils = StatusUtils;

}
