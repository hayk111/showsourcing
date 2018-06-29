import { BaseEntity } from './_entity.model';

export class Event extends BaseEntity<EventConfig> {
	rating?: number;
	alias?: string;

	constructor(config: EventConfig) {
		super(config);
		this.alias = config.alias || config.name;
	}
}

export interface EventConfig {
	alias?: string;
	// name doesn't actually exist on the event but is
	name?: string;
}
