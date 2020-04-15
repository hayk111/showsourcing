import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ERM } from '~core/erm';

import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'sample-selection-bar-app',
	templateUrl: './sample-selection-bar.component.html',
	styleUrls: ['./sample-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleSelectionBarComponent extends TrackingComponent {

	erm = ERM;

	constructor() {
		super();
	}
}
