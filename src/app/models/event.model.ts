import { BaseEntity } from '~models/_entity.model';
import { EventDescription } from '~models/event-description.model';

export class Event extends BaseEntity<EventConfig> {
	rating?: number;
	name?: string;
	description?: EventDescription;

	constructor(config: EventConfig) {
		super(config);
		this.description = new EventDescription(this.name);
	}
}

export interface EventConfig {
	name?: string;
}
