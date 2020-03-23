import { Typename } from '../typename.type';
import { EventDescription } from './event-description.model';
import { Team } from './team.model';
import { Entity } from './_entity.model';

export class Event extends Entity<Event> {
	__typename?: Typename = 'Event';
	id?: string;
	teamId?: string;
	team?: Team | null;
	global?: boolean | null;
	name?: string | null;
	description?: EventDescription;
}
