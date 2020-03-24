import { Entity } from './_entity.model';
import { Typename } from '../typename.type';
import { Team, Image, Industry, User, Venue } from './index';

export class EventDescription extends Entity<EventDescription> {
	__typename?: Typename = 'EventDescription';
	id?: string;
	teamId?: string;
	team?: Team | null;
	name?: string;
	description?: string | null;
	website?: string | null;
	startDate?: number | null;
	endDate?: number | null;
	countryCode?: string | null;
	venue?: Venue | null;
	logoImage?: Image | null;
	global?: boolean;
	supplierCount?: number | null;
	industry?: Industry | null;
	primaryColor?: string | null;
	secondaryColor?: string | null;
}
