import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { StatusUtils } from '~utils';
import { Typename } from '~core/erm3/typename.type';
import { WorkflowStatus } from '~core/erm3/models';

@Component({
	selector: 'status-badge-app',
	templateUrl: './status-badge.component.html',
	styleUrls: ['./status-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusBadgeComponent {
	@Input() size = 's';

	@Input() status: WorkflowStatus;
	// we need to pass this so when the
	// status is null, because the product or supplier are new
	@Input() typename: Typename;
	/** if we display the step or not */
	@Input() displayStep = false;

	statusUtils = StatusUtils;
}
