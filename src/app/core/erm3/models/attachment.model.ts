import { Typename } from '../typename.type';
import { Team } from './team.model';
import { Entity } from './_entity.model';

export class Attachment extends Entity<Attachment> {
	__typename?: Typename = 'Attachment';
	id?: string;
	teamId?: string;
	team?: Team | null;
	fileName?: string;
	url?: string | null;
	size?: number | null;
	deleted?: boolean;
	nodeId?: string;
	// front-end property
	pending?:  boolean;
}
