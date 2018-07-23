
import { User } from '~models/user.model';
import { Team } from '~models/team.model';

export interface TeamUser {
	id: string;
	accessType: string;
	user: User;
	team: Team;
}
