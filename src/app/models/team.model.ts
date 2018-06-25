import { User } from './user.model';
import { BaseEntity } from './_entity.model';
import { TeamUser } from './team-user.model';
import { uuid } from '~utils';


export class Team {
	id: string;
	creationDate?: string;
	createdBy?: User;
	ownerUser: User;
	name: string;
	defaultCurrency: string;
	users: [TeamUser];
	realmServerName = 'default';
	realmPath: string;
	status = 'pending';

	constructor(config: TeamConfig) {
		Object.assign(this, config);
		this.id = uuid();
		this.creationDate = '' + new Date();
		this.realmPath = `team/${this.id}`;
	}
}


export interface TeamConfig {
	name: string;
}
