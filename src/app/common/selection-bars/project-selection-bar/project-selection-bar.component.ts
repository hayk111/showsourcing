import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'project-selection-bar-app',
	templateUrl: './project-selection-bar.component.html',
	styleUrls: ['./project-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectSelectionBarComponent extends TrackingComponent {
	@Output() deleteSelected = new EventEmitter();
	constructor() {
		super();
	}
}
