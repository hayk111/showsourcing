import { EventEmitter, Input, Output, OnInit } from '@angular/core';
import { TrackingComponent } from '~utils/tracking-component';

export abstract class EntitySelectionBarComponent extends TrackingComponent {
	@Input() isShown = false;
	@Input() selection: Map<string, boolean>;
	@Input() count: number;
	@Output() close = new EventEmitter<null>();
	@Output() deleteSelected = new EventEmitter<null>();

	constructor() {
		super();
	}
}
