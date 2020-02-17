import { Company } from '~core/erm/models/company.model';
import { TeamUser } from '~core/erm/models/team-user.model';
import { User } from '~core/erm/models/user.model';
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
	companyId: string;
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
