import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ERM } from '~core/erm/models';

import { EntitySelectionBarComponent } from '../entity-selection-bar.component';

@Component({
	selector: 'project-selection-bar-app',
	templateUrl: './project-selection-bar.component.html',
	styleUrls: ['./project-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectSelectionBarComponent extends EntitySelectionBarComponent {

	erm = ERM;

	constructor() {
		super();
	}
}
