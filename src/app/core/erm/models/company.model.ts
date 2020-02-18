import { User } from '~core/erm/models/user.model';
import { Entity } from './_entity.model';
import { CreateCompanyInput } from '../../../API.service';

export class Company extends Entity<CreateCompanyInput> {
	__typename: string = 'Company';
	name: string;
	owner: User;
	createdBy: User;
	createdOn: Date;
	lastUpdatedBy?: User;
	lastUpdatedOn?: Date;

	constructor(config: CreateCompanyInput) {
		super(config);
	}
}
