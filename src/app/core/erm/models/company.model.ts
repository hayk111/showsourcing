import { User } from '~core/erm/models/user.model';
import { Entity } from './_entity.model';

export class Company extends Entity<Company> {
	__typename ?= 'Company';
	name?: string;
	owner?: User;
	createdBy?: User;
	createdOn?: Date;
	lastUpdatedBy?: User;
	lastUpdatedOn?: Date;
}
