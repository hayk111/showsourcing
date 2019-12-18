import { EventEmitter, Input, Output } from '@angular/core';
import { Entity } from '~core/models';
import { TrackingComponent } from '~utils/tracking-component';

export abstract class EntitySelectionBarComponent extends TrackingComponent {
	@Input() isShown = false;
	@Input() selection: Map<string, boolean>;
	@Input() items: Entity[];
	@Output() close = new EventEmitter<null>();
	@Output() deleteSelected = new EventEmitter<null>();
	@Output() selectAll = new EventEmitter<Entity[]>();
	@Output() unselectAll = new EventEmitter<null>();

	constructor() {
		super();
	}

}
