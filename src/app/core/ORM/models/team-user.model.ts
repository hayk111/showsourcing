
import { User } from '~core/orm/models/user.model';
import { Team } from '~core/orm/models/team.model';

export class TeamUser {
	id: string;
	accessType: string;
	user: User;
	team: Team;
	deleted: boolean;
}
