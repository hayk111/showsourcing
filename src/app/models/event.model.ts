import { Entity } from './_entity.model';

export class Event extends Entity<Event> {
	id: string;
	alias: string;
	rating: number;
	description: EventDescription;
}