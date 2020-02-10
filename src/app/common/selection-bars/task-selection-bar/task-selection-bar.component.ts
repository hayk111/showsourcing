import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ERM } from '~core/erm';

import { EntitySelectionBarComponent } from '../entity-selection-bar.component';

@Component({
	selector: 'task-selection-bar-app',
	templateUrl: './task-selection-bar.component.html',
	styleUrls: ['./task-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskSelectionBarComponent extends EntitySelectionBarComponent {

	erm = ERM;

	constructor() {
		super();
	}
}
