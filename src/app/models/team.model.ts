import { User } from './user.model';
import { BaseEntity } from './_entity.model';
import { TeamUser } from './team-user.model';


export class Team extends BaseEntity<TeamConfig> {
	ownerUser: User;
	name: string;
	defaultCurrency: string;
	users: [TeamUser];
	realmServerName: string;
	realmPath: string;
}


export interface TeamConfig {
	name: string;
}
