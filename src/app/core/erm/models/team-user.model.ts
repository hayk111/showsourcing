
import { User } from '~core/erm/models/user.model';
import { Team } from '~core/erm/models/team.model';

export class TeamUser {
	id: string;
	accessType: string;
	user: User;
	team: Team;
	deleted: boolean;
}
