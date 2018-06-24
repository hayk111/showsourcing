import { User } from './user.model';
import { BaseEntity } from './_entity.model';
import { TeamUser } from './team-user.model';


export class Team extends BaseEntity<TeamConfig> {
	ownerUser: User;
	name: string;
	defaultCurrency: string;
	users: [TeamUser];
	realmServerName: string = 'default';
	realmPath: string;
	status = 'pending';

	constructor(config: TeamConfig) {
		super(config);
		this.realmPath = `team/${this.id}`;
	}
}


export interface TeamConfig {
	name: string;
}
