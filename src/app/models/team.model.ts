import { User } from '~models/user.model';
import { EntityWithAudit } from '~models/_entity.model';
import { TeamUser } from '~models/team-user.model';
import { uuid } from '~utils';
import { Company } from '~models/company.model';


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
	__typename?= 'Team';

	constructor(config: TeamConfig) {
		Object.assign(this, config);
		this.id = uuid();
		this.creationDate = '' + new Date();
		this.realmPath = `team/${this.id}`;
	}
}

export interface TeamConfig {
	name: string;
	company: Company;
	ownerUser: User;
}
