import { Typename } from '../entity-name.type';
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
	createdAt?: number;
	createdByUserId?: string;
	createdBy?: User;
	deletedByUserId?: string;
	deletedBy?: User;
	deletedAt?: number | null;
	lastUpdatedByUserId?: string;
	lastUpdatedBy?: User;
	lastUpdatedAt?: number;
	deleted?: boolean;
	_version?: number;
	_deleted?: boolean | null;
	_lastChangedAt?: number;
}
