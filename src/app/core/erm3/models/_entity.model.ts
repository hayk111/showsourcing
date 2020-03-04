import { uuid } from '~utils';
import { TeamService } from '~core/auth/services/team.service';

export class Entity<G = any> {
	teamId? = TeamService.teamId;
	createdAt ?= Date.now();
	lastUpdatedAt?= Date.now();
	deleted? = false;

	constructor(config?: G) {
		Object.assign(this, config);
	}
}
