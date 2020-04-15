import { EventEmitter, Input, Output } from '@angular/core';
import { TrackingComponent } from '~utils/tracking-component';
import { Entity } from '~core/erm3/models/_entity.model';

/** @deprecated */
export abstract class EntitySelectionBarComponent extends TrackingComponent {
	// @Input() isShown = false;
	// @Input() selection: Map<string, boolean>;
	// @Output() close = new EventEmitter<null>();
	// @Output() deleteSelected = new EventEmitter<null>();
	// @Output() selectAll = new EventEmitter<Entity[]>();
	// @Output() unselectAll = new EventEmitter<null>();

	constructor() {
		super();
	}

}
