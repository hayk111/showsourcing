import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ERM } from '~core/ORM/models';

import { EntitySelectionBarComponent } from '../entity-selection-bar.component';

@Component({
	selector: 'sample-selection-bar-app',
	templateUrl: './sample-selection-bar.component.html',
	styleUrls: ['./sample-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleSelectionBarComponent extends EntitySelectionBarComponent {

	erm = ERM;

	constructor() {
		super();
	}
}
