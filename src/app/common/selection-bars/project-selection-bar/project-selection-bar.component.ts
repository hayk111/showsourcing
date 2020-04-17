import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'project-selection-bar-app',
	templateUrl: './project-selection-bar.component.html',
	styleUrls: ['./project-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectSelectionBarComponent extends TrackingComponent {

	constructor() {
		super();
	}
}
