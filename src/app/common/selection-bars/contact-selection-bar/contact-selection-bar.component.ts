import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';

import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'contact-selection-bar-app',
	templateUrl: './contact-selection-bar.component.html',
	styleUrls: ['./contact-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactSelectionBarComponent extends TrackingComponent {
	@Output() deleteSelected = new EventEmitter();
	constructor() {
		super();
	}

}
