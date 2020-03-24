import { Typename } from '../typename.type';
import { Team } from './team.model';
import { Entity } from './_entity.model';

export class Comment extends Entity<Comment> {
	__typename?: Typename = 'Comment';
	id?: string;
	teamId?: string;
	team?: Team | null;
	message?: string | null;
	nodeId?: string;
}
