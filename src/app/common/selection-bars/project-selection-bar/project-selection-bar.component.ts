import { Component, ChangeDetectionStrategy } from '@angular/core';
import { EntitySelectionBarComponent } from '../entity-selection-bar.component';

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
