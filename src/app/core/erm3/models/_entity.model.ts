import { Typename } from '../typename.type';
import { User } from './user.model';

export class Entity<G = any> {
	id?: string;
	__typename?: Typename;
	teamId?: string;

	id?: string;
	createdAt?: string;
	createdByUserId?: string;
	createdBy?: User;
	deletedByUserId?: string;
	deletedBy?: User;
	deletedAt?: string;
	lastUpdatedByUserId?: string;
	lastUpdatedBy?: User;
	lastUpdatedAt?: string;
	deleted?: boolean;

	_version?: number;
	_deleted?: boolean;
	_lastChangedAt?: number;

	constructor(config?: G) {
		Object.assign(this, config);
	}
}
