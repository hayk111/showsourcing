import { Typename } from '../typename.type';
import { Supplier } from './supplier.model';
import { Team } from './team.model';
import { User } from './user.model';
import { Entity } from './_entity.model';

export class Contact extends Entity<Contact> {
	__typename?: Typename = 'Contact';
	id?: string;
	teamId?: string;
	team?: Team;
	name?: string | null;
	phoneNumber?: string | null;
	email?: string | null;
	jobTitle?: string | null;
	supplierId?: string;
	supplier?: Supplier;
}
