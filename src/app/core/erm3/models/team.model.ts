import { Typename } from '../typename.type';
import { Entity } from './_entity.model';

export class Team extends Entity<Team> {
	__typename?: Typename = 'Team';
	id?: string;
	name?: string;
	ownerUserId?: string;
	companyId?: string;
	createdByUserId?: string;
	createdOn?: number;
	lastUpdatedByUserId?: string;
	lastUpdatedOn?: number | null;
}
