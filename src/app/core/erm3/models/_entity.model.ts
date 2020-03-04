import { uuid } from '~utils';
import { TeamService } from '~core/auth/services/team.service';

export class Entity<G = any> {
	// id ?= uuid();
	teamId? = TeamService.teamId;
	createdAt ?= Date.now();
	lastUpdatedAt?= Date.now();
	deleted? = false;

	// _deleted?: boolean;
	// _lastChangedAt?: number;
	// _version: number;
	// __typename?: string;

	constructor(config?: G) {
		Object.assign(this, config);
	}
}
