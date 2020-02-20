import { Entity } from '~core/erm/models/_entity.model';
import { EventDescription } from '~core/erm/models/event-description.model';

export class Event extends Entity<Event> {
	rating?: number;
	name?: string;
	description?: EventDescription;
	__typename ?= 'Event';

	constructor(config: Event) {
		super(config);
		this.description = new EventDescription(config.description || { name: this.name, global: false, supplierCount: 0 });
	}
}


