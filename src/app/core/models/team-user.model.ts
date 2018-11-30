
import { User } from '~models/user.model';
import { Team } from '~models/team.model';

export class TeamUser {
	id: string;
	accessType: string;
	user: User;
	team: Team;
	deleted: boolean;
}
