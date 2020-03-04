import { TeamInput, SupplierInput, UserInput } from '../../../API.service';
import { Entity } from './_entity.model';

export class Contact extends Entity<Contact> {
	__typename ?= 'Contact';
	id?: string;
	teamId?: string | null;
	team?: TeamInput | null;
	name?: string | null;
	phoneNumber?: string | null;
	email?: string | null;
	jobTitle?: string | null;
	supplierId?: string | null;
	supplier?: SupplierInput | null;
	createdAt?: number | null;
	createdByUserId?: string | null;
	createdBy?: UserInput | null;
	deletedByUserId?: string | null;
	deletedBy?: UserInput | null;
	deletedAt?: number | null;
	lastUpdatedByUserId?: string | null;
	lastUpdatedBy?: UserInput | null;
	lastUpdatedAt?: number | null;
	deleted?: boolean | null;
	_version?: number | null;
}
