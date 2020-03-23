import { Typename } from '../typename.type';
import { Team } from './team.model';
import { Entity } from './_entity.model';

export class Tag extends Entity<Tag> {
	__typename?: Typename = 'Tag';
	id?: string;
	teamId?: string;
	team?: Team | null;
	name?: string | null;
}
