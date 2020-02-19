import { Company } from '~core/erm/models/company.model';
import { User } from '~core/erm/models/user.model';
import { CreateTeamInput } from 'app/API.service';
import { Entity } from './_entity.model';

export class Team extends Entity<CreateTeamInput> {
	__typename: string = 'Team';
	name: string;
	owner: User;
	company: Company;
	createdBy: User;
	createdOn: Date;
	lastUpdatedBy?: User;
	lastUpdateOn?: Date;

	constructor(config: CreateTeamInput) {
		super(config);
	}
}
