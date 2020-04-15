import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'request-selection-bar-app',
	templateUrl: './request-selection-bar.component.html',
	styleUrls: ['./request-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestSelectionBarComponent extends TrackingComponent {

	@Output() cancelSelectedRequests = new EventEmitter<null>();

	constructor() {
		super();
	}
}
