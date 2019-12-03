import { Component, OnInit, EventEmitter, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { EntitySelectionBarComponent } from '~core/selection';

@Component({
	selector: 'request-selection-bar-app',
	templateUrl: './request-selection-bar.component.html',
	styleUrls: ['./request-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestSelectionBarComponent extends EntitySelectionBarComponent {
	@Output() cancelSelectedRequests = new EventEmitter<null>();

	constructor() {
		super();
	}
}
