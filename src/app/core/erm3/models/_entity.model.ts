import { Typename } from '../typename.type';

export class Entity<G = any> {
	__typename?: Typename;
	createdAt?: number;
	lastUpdatedAt?: number;
	deleted?: boolean;
	createdByUserId?: string;
	lastUpdatedByUserId?: string;
	teamId?: string;

	constructor(config?: G) {
		Object.assign(this, config);
	}
}
