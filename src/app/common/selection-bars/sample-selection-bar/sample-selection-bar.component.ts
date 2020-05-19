import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';

import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'sample-selection-bar-app',
	templateUrl: './sample-selection-bar.component.html',
	styleUrls: ['./sample-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleSelectionBarComponent extends TrackingComponent {

	@Output() deleteSelected = new EventEmitter();

	constructor() {
		super();
	}
}
