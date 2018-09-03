import { EntityWithAudit } from '~models/_entity.model';
import { EventDescription } from '~models/event-description.model';

export class Event extends EntityWithAudit<EventConfig> {
	rating?: number;
	name?: string;
	description?: EventDescription;
	__typename ?= 'Event';

	constructor(config: EventConfig) {
		super(config);
		this.description = new EventDescription(config.description || { name: this.name });
	}
}

export interface EventConfig {
	name?: string;
	description?: EventDescription;
}
