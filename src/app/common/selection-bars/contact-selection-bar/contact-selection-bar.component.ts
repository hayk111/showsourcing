import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ERM } from '~core/erm';

import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'contact-selection-bar-app',
	templateUrl: './contact-selection-bar.component.html',
	styleUrls: ['./contact-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactSelectionBarComponent extends TrackingComponent {

	erm = ERM;

	constructor() {
		super();
	}

}
