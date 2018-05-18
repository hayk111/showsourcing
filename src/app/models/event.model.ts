import { BaseEntity } from './_entity.model';

export class Event extends BaseEntity<Event> {
	id: string;
	alias: string;
	rating: number;
}

