
import { User } from '~core/ORM/models/user.model';
import { Team } from '~core/ORM/models/team.model';

export class TeamUser {
	id: string;
	accessType: string;
	user: User;
	team: Team;
	deleted: boolean;
}
