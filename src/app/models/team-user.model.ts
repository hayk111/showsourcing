
import { User } from './user.model';
import { Team } from './team.model';

export interface TeamUser {
	id: string;
	accessType: string;
	user: User;
	team: Team;
}
