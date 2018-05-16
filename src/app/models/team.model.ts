import { User } from './user.model';
import { Entity } from './_entity.model';
import { TeamUser } from './team-user.model';


export class Team extends Entity<Team> {
	ownerUser: User;
	name: string;
	defaultCurrency: string;
	users: [TeamUser];
}