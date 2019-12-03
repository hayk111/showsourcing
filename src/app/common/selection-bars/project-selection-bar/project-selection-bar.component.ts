import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EntitySelectionBarComponent } from '~core/selection';

@Component({
	selector: 'project-selection-bar-app',
	templateUrl: './project-selection-bar.component.html',
	styleUrls: ['./project-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectSelectionBarComponent extends EntitySelectionBarComponent {
	constructor() {
		super();
	}
}
