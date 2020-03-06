import { TeamService } from '~core/auth/services/team.service';
import { EntityName } from '../entity-name.type';

export class Entity<G = any> {
	__typename?: EntityName;
	teamId ?= TeamService.teamId;
	createdAt?: number;
	lastUpdatedAt?: number;
	deleted?: boolean;
	createdByUserId?: string;
	lastUpdatedByUserId?: string;

	constructor(config?: G) {
		Object.assign(this, config);
	}
}
