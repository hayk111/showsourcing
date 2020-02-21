import { Company } from '~core/erm/models/company.model';
import { User } from '~core/erm/models/user.model';
import { Entity } from './_entity.model';
import { TeamUser } from './team-user.model';

export class Team extends Entity<Team> {
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

}
