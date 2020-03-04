import { uuid } from '~utils';
import { TeamService } from '~core/auth/services/team.service';
import { EntityName } from '../entity-name.type';

export class Entity<G = any> {
	teamId? = TeamService.teamId;
	createdAt?: number;
	lastUpdatedAt?: number;
	deleted?: boolean;

	constructor(config?: G) {
		Object.assign(this, config);
	}
}
