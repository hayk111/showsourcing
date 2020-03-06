import { Typename } from '../typename.type';
import { User } from './user.model';
import { Entity } from './_entity.model';

export class Company extends Entity<Company> {
	__typename?: Typename = 'Company';
	id?: string;
	name?: string;
	ownerUserId?: string;
	owner?: User;
	createdByUserId?: string;
	createdBy?: User;
	createdAt?: number;
	lastUpdatedByUserId?: string;
	lastUpdatedBy?: User;
	lastUpdatedAt?: number | null;
	_version?: number;
	_deleted?: boolean | null;
	_lastChangedAt?: number;
}
