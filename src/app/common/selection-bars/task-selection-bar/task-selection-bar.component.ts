import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ERM } from '~core/erm';

import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'task-selection-bar-app',
	templateUrl: './task-selection-bar.component.html',
	styleUrls: ['./task-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskSelectionBarComponent extends TrackingComponent {

	erm = ERM;

	constructor() {
		super();
	}
}
