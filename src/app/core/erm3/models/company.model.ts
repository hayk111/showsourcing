import { Typename } from '../typename.type';
import { User } from './user.model';
import { Entity } from './_entity.model';

export class Company extends Entity<Company> {
	__typename?: Typename = 'Company';
	id?: string;
	name?: string;
	ownerUserId?: string;
	owner?: User;
}
