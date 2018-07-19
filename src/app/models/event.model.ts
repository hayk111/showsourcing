import { BaseEntity } from './_entity.model';
import { EventDescription } from '~models/event-description.model';

export class Event extends BaseEntity<EventConfig> {
	rating?: number;
	name?: string;
	description?: EventDescription;

	constructor(config: EventConfig) {
		super(config);
		this.name = config.name;
		this.description = new EventDescription(this.name);
	}
}

export interface EventConfig {
	name?: string;
}
