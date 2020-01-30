import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ERM } from '~core/ORM/models';

import { EntitySelectionBarComponent } from '../entity-selection-bar.component';

@Component({
	selector: 'request-selection-bar-app',
	templateUrl: './request-selection-bar.component.html',
	styleUrls: ['./request-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestSelectionBarComponent extends EntitySelectionBarComponent {

	@Output() cancelSelectedRequests = new EventEmitter<null>();

	erm = ERM;

	constructor() {
		super();
	}
}
