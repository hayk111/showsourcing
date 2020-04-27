import { Entity } from './_entity.model';
import { Typename } from '../typename.type';
import { User } from './user.model';

export class Vote extends Entity<Vote> {
	__typename?: Typename = 'Vote';
	id?: string;
	createdBy?: User;
	voteCreatedById: string;
	nodeId?: string;
	rating?: number;
}
