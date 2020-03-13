import { Typename } from '../typename.type';
import { User } from './user.model';

export class Entity<G = any> {
	__typename?: Typename;
	teamId?: string;

	createdAt?: number;
	createdByUserId?: string;
	createdBy?: User | null;
	deletedByUserId?: string;
	deletedBy?: User | null;
	deletedAt?: number | null;
	lastUpdatedByUserId?: string;
	lastUpdatedBy?: User | null;
	lastUpdatedAt?: number;
	deleted?: boolean;

	_version?: number;
	_deleted?: boolean | null;
	_lastChangedAt?: number;

	constructor(config?: G) {
		Object.assign(this, config);
	}
}
