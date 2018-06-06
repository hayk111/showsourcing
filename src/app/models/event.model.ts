import { BaseEntity } from './_entity.model';

export class Event extends BaseEntity<EventConfig> {
	rating?: number;
	alias?: string;
}

export interface EventConfig {
	alias: string;
}
