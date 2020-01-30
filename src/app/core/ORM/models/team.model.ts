import { Company } from '~core/ORM/models/company.model';
import { TeamUser } from '~core/ORM/models/team-user.model';
import { User } from '~core/ORM/models/user.model';
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
	company: Company;
	__typename ?= 'Team';

	constructor(config: TeamConfig) {
		Object.assign(this, config);
		this.id = uuid();
		this.creationDate = '' + new Date();
	}
}

export interface TeamConfig {
	name: string;
	company: Company;
	ownerUser: User;
}
