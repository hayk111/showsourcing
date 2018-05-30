import { BaseEntity } from './_entity.model';

export class Event extends BaseEntity<Event> {
	rating?: number;
	name?: string;
}
