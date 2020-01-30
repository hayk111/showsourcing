import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Status } from '~core/erm';
import { EntityMetadata } from '~core/erm';
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
	/** if we display the step or not */
	@Input() displayStep = false;

	statusUtils = StatusUtils;

}
