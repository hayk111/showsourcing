import { BaseEntity } from './_entity.model';
import { EventDescription } from '~models/event-description.model';

export class Event extends BaseEntity<EventConfig> {
	rating?: number;
	alias?: string;
	description?: EventDescription;

	constructor(config: EventConfig) {
		super(config);
		this.alias = config.alias || config.name;
		this.description = new EventDescription(this.alias);
	}
}

export interface EventConfig {
	alias?: string;
	// name doesn't actually exist on the event but to keep consistency we do it this way
	name?: string;
}
