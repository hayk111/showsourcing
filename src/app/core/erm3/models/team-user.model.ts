
import { User } from './user.model';
import { Team } from './team.model';

export class TeamUser {
	id: string;
	teamId: string;
	team: Team;
	userId: string;
	user: User;
	role: string;
}

