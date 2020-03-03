import { uuid } from '~utils';
import { TeamService } from '~core/auth/services/team.service';

export class Entity<G = any> {
	teamId? = TeamService.teamId;
	// _deleted?: boolean;
	// _lastChangedAt?: number;
	// _version: number;
	// __typename?: string;

	constructor(config?: G) {
		Object.assign(this, config);
	}
}
