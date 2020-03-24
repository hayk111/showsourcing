import { Entity } from './_entity.model';
import { Typename } from '../typename.type';

export class Venue extends Entity<Venue> {
	__typename?: Typename = 'Venue';
	id?: string;
	teamId?: string;
	city?: string | null;
	name?: string;
	latitude?: number | null;
	country?: string | null;
	longitude?: number | null;
	addressFull?: string | null;
}
